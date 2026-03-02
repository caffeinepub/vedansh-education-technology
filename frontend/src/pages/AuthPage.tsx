import { useState, useRef, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Shield, RefreshCw, Phone, ArrowRight, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function AuthPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setStep('otp');
    setCountdown(30);
    toast.success('OTP sent successfully! (Use any 6 digits)');
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      otpRefs.current[5]?.focus();
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Please enter all 6 digits');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    localStorage.setItem('vedansh_phone', phone);
    toast.success('Login successful! Welcome to Vedansh! 🎓');
    navigate({ to: '/dashboard' });
  };

  const handleResendOTP = () => {
    if (countdown > 0) return;
    setCountdown(30);
    setOtp(['', '', '', '', '', '']);
    toast.success('OTP resent successfully!');
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/assets/generated/splash-bg.dim_1080x1920.png)', backgroundSize: 'cover' }} />
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-vedansh-orange/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-vedansh-gold/5 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-glass">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-vedansh-orange/20 border border-vedansh-orange/30 flex items-center justify-center mx-auto mb-4">
              {step === 'phone' ? <Phone className="w-8 h-8 text-vedansh-orange" /> : <Lock className="w-8 h-8 text-vedansh-orange" />}
            </div>
            <h1 className="font-baloo font-bold text-2xl text-white mb-1">
              {step === 'phone' ? 'Login to Vedansh' : 'Verify OTP'}
            </h1>
            <p className="text-white/60 text-sm">
              {step === 'phone'
                ? 'Enter your mobile number to continue'
                : `OTP sent to +91 ${phone}`}
            </p>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-semibold">Fully Secure | End-to-End Encrypted</span>
          </div>

          {step === 'phone' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="text-white/70 text-sm font-medium block mb-2">Mobile Number</label>
                <div className="flex gap-2">
                  <div className="bg-white/10 border border-white/20 rounded-xl px-3 flex items-center text-white/70 text-sm font-medium shrink-0">
                    +91
                  </div>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter 10-digit number"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-vedansh-orange rounded-xl"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading || phone.length !== 10}
                className="w-full bg-vedansh-orange hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-base"
              >
                {loading ? (
                  <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Sending OTP...</span>
                ) : (
                  <span className="flex items-center gap-2">Send OTP <ArrowRight className="w-4 h-4" /></span>
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="text-white/70 text-sm font-medium block mb-3 text-center">Enter 6-digit OTP</label>
                <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={`w-11 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all duration-200 bg-white/10 text-white outline-none
                        ${digit ? 'border-vedansh-orange bg-vedansh-orange/20 scale-105' : 'border-white/20 focus:border-vedansh-orange'}`}
                    />
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || otp.join('').length !== 6}
                className="w-full bg-vedansh-orange hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-base"
              >
                {loading ? (
                  <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Verifying...</span>
                ) : (
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Verify & Login</span>
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={countdown > 0}
                  className={`text-sm transition-colors ${countdown > 0 ? 'text-white/40 cursor-not-allowed' : 'text-vedansh-orange hover:text-orange-400 cursor-pointer'}`}
                >
                  {countdown > 0 ? (
                    <span className="flex items-center gap-1 justify-center">
                      <RefreshCw className="w-3 h-3" /> Resend OTP in {countdown}s
                    </span>
                  ) : (
                    'Resend OTP'
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={() => { setStep('phone'); setOtp(['', '', '', '', '', '']); }}
                className="w-full text-white/50 hover:text-white/80 text-sm transition-colors"
              >
                ← Change mobile number
              </button>
            </form>
          )}
        </div>

        {/* Free badge */}
        <div className="text-center mt-6">
          <span className="inline-flex items-center gap-2 text-white/50 text-xs">
            <CheckCircle className="w-3 h-3 text-vedansh-success" />
            100% Free • No Credit Card Required • No Hidden Charges
          </span>
        </div>
      </div>
    </div>
  );
}
