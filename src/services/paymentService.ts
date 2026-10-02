import { PaymentTransaction, ProviderType } from '../types';
import { PAYMENT_CONFIG } from '../data/plansData';

const STORAGE_KEY_VIP = 'goat392_vip_subscription';
const STORAGE_KEY_TXS = 'goat392_transactions';

export interface VipSubscriptionState {
  isActive: boolean;
  planId: string;
  planName: string;
  activatedAt: number;
  expiresAt: number;
  vipToken: string;
}

export class PaymentService {
  static initiatePayment(params: {
    provider: ProviderType;
    amount: number;
    planId: string;
    planName: string;
    phoneNumber?: string;
    senderName?: string;
    customerEmail?: string;
  }): PaymentTransaction {
    const txId = 'TXN-' + Math.floor(10000000 + Math.random() * 90000000);
    const isMtn = params.provider === 'MTN';
    const isOrange = params.provider === 'ORANGE';

    const transaction: PaymentTransaction = {
      transactionId: txId,
      provider: params.provider,
      amount: params.amount,
      planId: params.planId,
      planName: params.planName,
      phoneNumber: params.phoneNumber,
      senderName: params.senderName,
      customerEmail: params.customerEmail,
      recipientName: isMtn
        ? PAYMENT_CONFIG.mtn.accountName
        : isOrange
        ? PAYMENT_CONFIG.orange.accountName
        : PAYMENT_CONFIG.visa.cardHolder,
      recipientNumber: isMtn
        ? PAYMENT_CONFIG.mtn.number
        : isOrange
        ? PAYMENT_CONFIG.orange.number
        : PAYMENT_CONFIG.visa.cardNumber,
      ussdCode: isMtn ? PAYMENT_CONFIG.mtn.ussdDial : isOrange ? PAYMENT_CONFIG.orange.ussdDial : '',
      status: 'INITIATED',
      createdAt: Date.now(),
    };

    this.saveTransaction(transaction);
    return transaction;
  }

  static verifyAndActivatePayment(params: {
    transactionId: string;
    confirmationCode?: string;
    planId: string;
    planName: string;
    provider: ProviderType;
    durationDays?: number;
    customerEmail?: string;
    phoneNumber?: string;
  }): { success: boolean; message: string; subscription?: VipSubscriptionState; transaction?: PaymentTransaction } {
    const durationDays = params.planId === 'vip-3-mois' ? 90 : params.planId === 'vip-12-mois' ? 365 : 30;
    const now = Date.now();
    const expiresAt = now + durationDays * 24 * 60 * 60 * 1000;
    const vipToken = 'VIP-' + Math.random().toString(36).substring(2, 10).toUpperCase();

    const sub: VipSubscriptionState = {
      isActive: true,
      planId: params.planId,
      planName: params.planName,
      activatedAt: now,
      expiresAt,
      vipToken,
    };

    localStorage.setItem(STORAGE_KEY_VIP, JSON.stringify(sub));

    // Update transaction
    const txs = this.getTransactions();
    let tx = txs.find((t) => t.transactionId === params.transactionId);
    if (tx) {
      tx.status = 'SUCCESS';
      tx.vipToken = vipToken;
      if (params.customerEmail) tx.customerEmail = params.customerEmail;
      if (params.phoneNumber) tx.phoneNumber = params.phoneNumber;
      localStorage.setItem(STORAGE_KEY_TXS, JSON.stringify(txs));
    }

    return {
      success: true,
      message: 'Paiement validé avec succès ! Votre accès VIP GOAT392 est désormais actif.',
      subscription: sub,
      transaction: tx,
    };
  }

  static sendReceipt(params: {
    transactionId: string;
    method: 'EMAIL' | 'SMS_WHATSAPP';
    recipient: string;
    vipToken: string;
    planName: string;
    amount: number;
  }): { success: boolean; message: string; receiptText: string; whatsappUrl?: string } {
    const dateFormatted = new Date().toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const receiptText = `━━━━━━━━━━━━━━━━━━━━━━━
🧾 REÇU DE PAIEMENT OFFICIEL GOAT392
━━━━━━━━━━━━━━━━━━━━━━━
Réf Transaction : ${params.transactionId}
Date d'émission : ${dateFormatted}
Formule Souscrite : ${params.planName}
Montant Réglé : ${params.amount.toLocaleString('fr-FR')} FCFA
Statut : PAYÉ ET VALIDÉ (100% SÉCURISÉ)

🔑 CLÉ VIP SECRÈTE : ${params.vipToken}
🔗 Canal Telegram VIP : https://t.me/maximecartercoupondujour
📱 Assistance WhatsApp VIP : +237 683 11 18 04
━━━━━━━━━━━━━━━━━━━━━━━
Conservez précieusement ce reçu. Bienvenue dans l'élite !`;

    // Update stored transaction
    const txs = this.getTransactions();
    const tx = txs.find((t) => t.transactionId === params.transactionId);
    if (tx) {
      tx.receiptSentTo = params.recipient;
      tx.receiptSentMethod = params.method;
      tx.receiptSentAt = Date.now();
      localStorage.setItem(STORAGE_KEY_TXS, JSON.stringify(txs));
    }

    let whatsappUrl: string | undefined;
    if (params.method === 'SMS_WHATSAPP') {
      const cleanPhone = params.recipient.replace(/\D/g, '');
      const encodedMsg = encodeURIComponent(receiptText);
      whatsappUrl = `https://wa.me/${cleanPhone.startsWith('237') ? cleanPhone : '237' + cleanPhone}?text=${encodedMsg}`;
    }

    return {
      success: true,
      message:
        params.method === 'EMAIL'
          ? `Le reçu de confirmation a été envoyé par email à : ${params.recipient}`
          : `Le reçu officiel a été généré pour le numéro : ${params.recipient}`,
      receiptText,
      whatsappUrl,
    };
  }

  static getVipStatus(): VipSubscriptionState | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_VIP);
      if (!raw) return null;
      const sub: VipSubscriptionState = JSON.parse(raw);
      if (sub.expiresAt < Date.now()) {
        localStorage.removeItem(STORAGE_KEY_VIP);
        return null;
      }
      return sub;
    } catch {
      return null;
    }
  }

  static revokeVip(): void {
    localStorage.removeItem(STORAGE_KEY_VIP);
  }

  static saveTransaction(tx: PaymentTransaction): void {
    try {
      const txs = this.getTransactions();
      txs.unshift(tx);
      localStorage.setItem(STORAGE_KEY_TXS, JSON.stringify(txs.slice(0, 20)));
    } catch {
      // ignore
    }
  }

  static getTransactions(): PaymentTransaction[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_TXS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
