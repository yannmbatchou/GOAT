import React, { useState, useEffect } from 'react';
import { VIP_PLANS, PAYMENT_CONFIG } from '../data/plansData';
import { ProviderType } from '../types';
import { PaymentService, VipSubscriptionState } from '../services/paymentService';
import {
  X,
  Smartphone,
  CreditCard,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  ArrowRight,
  Loader2,
  AlertCircle,
  ExternalLink,
  Send,
  PhoneCall,
  Lock,
  Mail,
  Printer,
  FileText,
  Share2,
  Sparkles,
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId?: string;
  onPaymentSuccess: (sub: VipSubscriptionState) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  initialPlanId,
  onPaymentSuccess,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    initialPlanId || 'vip-3-mois'
  );
  const [provider, setProvider] = useState<ProviderType>('MTN');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [transactionCodeInput, setTransactionCodeInput] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Flow states: 'CONFIG' | 'USSD_PUSH' | 'MANUAL_VERIFY' | 'SUCCESS'
  const [flowState, setFlowState] = useState<'CONFIG' | 'USSD_PUSH' | 'MANUAL_VERIFY' | 'SUCCESS'>('CONFIG');
  const [isLoading, setIsLoading] = useState(false);
  const [ussdTimer, setUssdTimer] = useState(35);
  const [currentTxId, setCurrentTxId] = useState<string>('');
  const [completedSubscription, setCompletedSubscription] = useState<VipSubscriptionState | null>(null);

  // Receipt delivery state
  const [receiptMethod, setReceiptMethod] = useState<'EMAIL' | 'SMS_WHATSAPP'>('EMAIL');
  const [receiptTarget, setReceiptTarget] = useState('');
  const [isSendingReceipt, setIsSendingReceipt] = useState(false);
  const [receiptSentSuccess, setReceiptSentSuccess] = useState<string | null>(null);
  const [receiptWhatsAppUrl, setReceiptWhatsAppUrl] = useState<string | null>(null);
  const [showReceiptPreview, setShowReceiptPreview] = useState(false);

  // Update selected plan if initialPlanId changes
  useEffect(() => {
    if (initialPlanId) {
      setSelectedPlanId(initialPlanId);
    }
  }, [initialPlanId]);

  // Synchronize default receipt target when switching tabs or upon success
  useEffect(() => {
    if (receiptMethod === 'EMAIL') {
      setReceiptTarget(customerEmail || '');
    } else {
      setReceiptTarget(customerPhone ? (customerPhone.startsWith('+237') ? customerPhone : '+237 ' + customerPhone) : '');
    }
  }, [receiptMethod, customerEmail, customerPhone, flowState]);

  // USSD Countdown timer when PUSH is initiated
  useEffect(() => {
    let interval: any;
    if (flowState === 'USSD_PUSH' && ussdTimer > 0) {
      interval = setInterval(() => {
        setUssdTimer((prev) => {
          if (prev <= 1) {
            handleSimulatedSuccess();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [flowState, ussdTimer]);

  if (!isOpen) return null;

  const currentPlan = VIP_PLANS.find((p) => p.id === selectedPlanId) || VIP_PLANS[1];

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleInitiatePush = () => {
    if (provider !== 'VISA' && !customerPhone.trim()) {
      alert('Veuillez renseigner votre numéro de téléphone pour recevoir la notification de paiement.');
      return;
    }

    setIsLoading(true);

    const tx = PaymentService.initiatePayment({
      provider,
      amount: currentPlan.priceFcfa,
      planId: currentPlan.id,
      planName: currentPlan.name,
      phoneNumber: customerPhone,
      senderName: customerName,
      customerEmail: customerEmail,
    });

    setCurrentTxId(tx.transactionId);

    // Simulate API network handshake (1.2s)
    setTimeout(() => {
      setIsLoading(false);
      setUssdTimer(35);
      setFlowState('USSD_PUSH');
    }, 1200);
  };

  const handleSimulatedSuccess = () => {
    const res = PaymentService.verifyAndActivatePayment({
      transactionId: currentTxId || 'TXN-' + Math.floor(10000000 + Math.random() * 90000000),
      planId: currentPlan.id,
      planName: currentPlan.name,
      provider,
      customerEmail,
      phoneNumber: customerPhone,
    });

    if (res.success && res.subscription) {
      setCompletedSubscription(res.subscription);
      setFlowState('SUCCESS');
      onPaymentSuccess(res.subscription);

      // Auto-dispatch receipt if user already provided email or phone
      if (customerEmail) {
        PaymentService.sendReceipt({
          transactionId: currentTxId || res.subscription.vipToken,
          method: 'EMAIL',
          recipient: customerEmail,
          vipToken: res.subscription.vipToken,
          planName: currentPlan.name,
          amount: currentPlan.priceFcfa,
        });
        setReceiptSentSuccess(`Reçu officiel envoyé automatiquement par email à : ${customerEmail}`);
      }
    }
  };

  const handleManualValidation = () => {
    if (!transactionCodeInput.trim()) {
      alert('Veuillez renseigner le code ou SMS de validation reçu sur votre téléphone.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      handleSimulatedSuccess();
    }, 1500);
  };

  const handleSendReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptTarget.trim() || !completedSubscription) {
      alert('Veuillez spécifier un email ou numéro valide.');
      return;
    }

    setIsSendingReceipt(true);
    setReceiptSentSuccess(null);

    setTimeout(() => {
      setIsSendingReceipt(false);
      const res = PaymentService.sendReceipt({
        transactionId: currentTxId || completedSubscription.vipToken,
        method: receiptMethod,
        recipient: receiptTarget.trim(),
        vipToken: completedSubscription.vipToken,
        planName: completedSubscription.planName,
        amount: currentPlan.priceFcfa,
      });

      setReceiptSentSuccess(res.message);
      if (res.whatsappUrl) {
        setReceiptWhatsAppUrl(res.whatsappUrl);
      }
    }, 600);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Passerelle Sécurisée GOAT392</span>
          </div>
          <h3 className="text-2xl font-black text-white">
            {flowState === 'SUCCESS' ? 'Félicitations • Paiement Validé' : `Souscrire au ${currentPlan.name}`}
          </h3>
          <p className="text-xs text-slate-400">
            {flowState === 'SUCCESS'
              ? 'Votre accès VIP est débloqué. Téléchargez votre reçu ci-dessous.'
              : 'Choisissez votre opérateur pour finaliser votre activation instantanée.'}
          </p>
        </div>

        {/* ===================== VIEW 1: CONFIG VIEW ===================== */}
        {flowState === 'CONFIG' && (
          <div className="space-y-6">
            {/* Plan Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">
                Formule VIP Sélectionnée :
              </label>
              <div className="grid grid-cols-3 gap-2">
                {VIP_PLANS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlanId(p.id)}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                      selectedPlanId === p.id
                        ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <p className="text-[11px] font-bold truncate">{p.name}</p>
                    <p className="text-xs font-black text-amber-400 font-mono mt-0.5">
                      {p.priceFcfa.toLocaleString('fr-FR')} F
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Provider Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">
                Moyen de Paiement Mobile :
              </label>
              <div className="grid grid-cols-3 gap-3">
                {/* MTN Button */}
                <button
                  type="button"
                  onClick={() => setProvider('MTN')}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 transition cursor-pointer ${
                    provider === 'MTN'
                      ? 'bg-yellow-500/15 border-yellow-400 text-white shadow-lg shadow-yellow-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-yellow-400" />
                  <span className="font-extrabold text-xs">MTN Money</span>
                  <span className="text-[10px] text-slate-500 font-mono">671 46 00 23</span>
                </button>

                {/* Orange Button */}
                <button
                  type="button"
                  onClick={() => setProvider('ORANGE')}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 transition cursor-pointer ${
                    provider === 'ORANGE'
                      ? 'bg-orange-500/15 border-orange-400 text-white shadow-lg shadow-orange-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-orange-400" />
                  <span className="font-extrabold text-xs">Orange Money</span>
                  <span className="text-[10px] text-slate-500 font-mono">655 24 75 63</span>
                </button>

                {/* Visa Button */}
                <button
                  type="button"
                  onClick={() => setProvider('VISA')}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 transition cursor-pointer ${
                    provider === 'VISA'
                      ? 'bg-blue-500/15 border-blue-400 text-white shadow-lg shadow-blue-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-blue-400" />
                  <span className="font-extrabold text-xs">Carte VISA</span>
                  <span className="text-[10px] text-slate-500 font-mono">4834 ••••</span>
                </button>
              </div>
            </div>

            {/* Customer Information Inputs */}
            <div className="space-y-3 pt-1">
              {provider !== 'VISA' ? (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                    <span>Votre Numéro Mobile de Débit (Requis) :</span>
                    <span className="text-[11px] text-amber-400 font-normal">Reçoit le push USSD</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
                      +237
                    </div>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="6XXXXXXXX"
                      maxLength={9}
                      className="w-full pl-16 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              ) : null}

              {/* Email Address for Instant Receipt Delivery */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    Adresse Email pour le reçu officiel de paiement (Optionnel) :
                  </span>
                  <span className="text-[10px] text-emerald-400">Reçu PDF immédiat</span>
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="votre.email@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleInitiatePush}
                disabled={isLoading}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Connexion à l'API {provider}...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-slate-950" />
                    Initier le Débit ({currentPlan.priceFcfa.toLocaleString('fr-FR')} F)
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setFlowState('MANUAL_VERIFY')}
                className="px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
              >
                Dépôt Manuel
              </button>
            </div>
          </div>
        )}

        {/* ===================== VIEW 2: USSD PUSH CONFIRMATION ===================== */}
        {flowState === 'USSD_PUSH' && (
          <div className="space-y-6 text-center py-2">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-400 mx-auto flex items-center justify-center animate-pulse">
              <Smartphone className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-black text-white">
                Validez sur votre téléphone (+237 {customerPhone})
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Un message push USSD de facturation a été envoyé sur votre smartphone. Entrez votre code PIN secret {provider} pour autoriser le débit de <strong className="text-amber-400">{currentPlan.priceFcfa.toLocaleString('fr-FR')} FCFA</strong>.
              </p>
            </div>

            {/* USSD Timer */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 inline-flex flex-col items-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Temps d'attente automatique
              </span>
              <span className="font-mono text-3xl font-black text-amber-400 mt-1">
                {ussdTimer}s
              </span>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleSimulatedSuccess}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                J'ai validé mon code secret (Activer maintenant)
              </button>

              <button
                type="button"
                onClick={() => setFlowState('MANUAL_VERIFY')}
                className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
              >
                Je n'ai pas reçu le push (Saisir la référence SMS)
              </button>
            </div>
          </div>
        )}

        {/* ===================== VIEW 3: MANUAL VERIFY ===================== */}
        {flowState === 'MANUAL_VERIFY' && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-200 space-y-1">
              <p className="font-bold text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Transfert classique direct :
              </p>
              <p className="text-[11px] text-slate-300">
                Envoyez <strong>{currentPlan.priceFcfa.toLocaleString('fr-FR')} FCFA</strong> au numéro ci-dessous :
              </p>
              <div className="pt-1.5 flex items-center justify-between font-mono font-bold text-white bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span>{provider === 'MTN' ? PAYMENT_CONFIG.mtn.number : PAYMENT_CONFIG.orange.number} ({provider})</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(provider === 'MTN' ? PAYMENT_CONFIG.mtn.number : PAYMENT_CONFIG.orange.number, 'manual_num')}
                  className="px-2 py-1 bg-amber-400 text-slate-950 rounded text-[10px] font-bold flex items-center gap-1"
                >
                  {copiedField === 'manual_num' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  Copier
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Référence SMS de la transaction reçue sur votre téléphone :
              </label>
              <input
                type="text"
                value={transactionCodeInput}
                onChange={(e) => setTransactionCodeInput(e.target.value)}
                placeholder="Ex: MP2409... ou Réf SMS"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleManualValidation}
                disabled={isLoading}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Vérification du reçu en cours...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Valider le Paiement & Obtenir le Reçu
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setFlowState('CONFIG')}
                className="px-4 py-3.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
              >
                Retour
              </button>
            </div>
          </div>
        )}

        {/* ===================== VIEW 4: SUCCESS VIEW WITH RECEIPT DISPATCH ===================== */}
        {flowState === 'SUCCESS' && completedSubscription && (
          <div className="space-y-6 text-center py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black">
                PAIEMENT CONFIRMÉ • ACCÈS VIP ACTIF
              </span>
              <h4 className="text-2xl font-black text-white pt-2">
                Bienvenue dans le VIP GOAT392 !
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Votre abonnement <strong className="text-amber-400">{completedSubscription.planName}</strong> est validé.
              </p>
            </div>

            {/* Token Badge */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                Votre Clé VIP Personnelle
              </p>
              <p className="font-mono text-lg font-black text-amber-300 tracking-wider">
                {completedSubscription.vipToken}
              </p>
              <p className="text-[11px] text-slate-400">
                Expire le : {new Date(completedSubscription.expiresAt).toLocaleDateString('fr-FR')}
              </p>
            </div>

            {/* ================= RECEIPT DISPATCH MODULE (EMAIL OR PHONE/SMS/WHATSAPP) ================= */}
            <div className="rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-amber-500/30 p-4 sm:p-5 text-left space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-extrabold text-white uppercase tracking-wider">
                    Envoi du Reçu de Paiement Validé
                  </span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                  Certifié Authentique ✓
                </span>
              </div>

              {/* Delivery Tabs: Email vs Téléphone/SMS/WhatsApp */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setReceiptMethod('EMAIL');
                    setReceiptSentSuccess(null);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                    receiptMethod === 'EMAIL'
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-black'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Par Email</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setReceiptMethod('SMS_WHATSAPP');
                    setReceiptSentSuccess(null);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                    receiptMethod === 'SMS_WHATSAPP'
                      ? 'bg-emerald-500 text-white border-emerald-400 shadow-md font-black'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Par Téléphone / SMS / WhatsApp</span>
                </button>
              </div>

              {/* Recipient Input & Send Trigger */}
              <form onSubmit={handleSendReceipt} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">
                    {receiptMethod === 'EMAIL'
                      ? 'Adresse email confirmée de réception :'
                      : 'Numéro de téléphone confirmé (SMS ou WhatsApp) :'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type={receiptMethod === 'EMAIL' ? 'email' : 'text'}
                      required
                      value={receiptTarget}
                      onChange={(e) => setReceiptTarget(e.target.value)}
                      placeholder={receiptMethod === 'EMAIL' ? 'ex: nom@gmail.com' : 'ex: 683111804 ou +237...'}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-black border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none font-mono"
                    />
                    <button
                      type="submit"
                      disabled={isSendingReceipt}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0 disabled:opacity-50"
                    >
                      {isSendingReceipt ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5 fill-slate-950" />
                      )}
                      <span>{isSendingReceipt ? 'Envoi...' : 'Transmettre'}</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Success Notification Alert */}
              {receiptSentSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-start gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold">{receiptSentSuccess}</p>
                    {receiptWhatsAppUrl && (
                      <a
                        href={receiptWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1 rounded-lg mt-1 transition"
                      >
                        <PhoneCall className="w-3 h-3" />
                        Ouvrir mon reçu directement sur WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Secondary Actions: Printable & Preview */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px]">
                <button
                  type="button"
                  onClick={() => setShowReceiptPreview(!showReceiptPreview)}
                  className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  {showReceiptPreview ? 'Masquer l\'aperçu du reçu' : 'Voir l\'aperçu du reçu certifié'}
                </button>

                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer font-bold bg-slate-800 px-2.5 py-1 rounded-lg hover:bg-slate-700 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Imprimer / PDF
                </button>
              </div>

              {/* Collapsible Receipt Preview Card */}
              {showReceiptPreview && (
                <div className="p-4 rounded-xl bg-black border border-amber-500/40 space-y-2.5 font-mono text-[11px] text-slate-300 select-text">
                  <div className="text-center border-b border-slate-800 pb-2 space-y-0.5">
                    <p className="font-extrabold text-amber-400 text-xs">GOAT392 PRONOSTICS SÉCURISÉ</p>
                    <p className="text-[10px] text-slate-500">REÇU OFFICIEL DE TRANSACTION</p>
                  </div>

                  <div className="space-y-1 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Réf :</span>
                      <span className="font-bold text-white">{currentTxId || 'TXN-CONFIRMED'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Formule :</span>
                      <span className="font-bold text-amber-300">{completedSubscription.planName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Montant :</span>
                      <span className="font-bold text-emerald-400">{currentPlan.priceFcfa.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Opérateur :</span>
                      <span className="font-bold text-white">{provider} Mobile Money</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Clé VIP :</span>
                      <span className="font-bold text-yellow-300">{completedSubscription.vipToken}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800 pt-1">
                      <span className="text-slate-500">Statut :</span>
                      <span className="font-extrabold text-emerald-400">PAYÉ & ENREGISTRÉ ✓</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Official Access Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={PAYMENT_CONFIG.support.telegramVipChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-sky-500/25 transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                REJOINDRE LE CANAL TELEGRAM VIP SECRET
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={PAYMENT_CONFIG.support.whatsappUrl1}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Contacter l'assistance VIP sur WhatsApp (+237 683 11 18 04)
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
              >
                Accéder aux Pronostics du Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
