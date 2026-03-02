import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActor } from '../hooks/useActor';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GraduationCap } from 'lucide-react';

interface ProfileSetupModalProps {
  open: boolean;
}

export default function ProfileSetupModal({ open }: ProfileSetupModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !name.trim() || phone.length !== 10) return;

    setLoading(true);
    try {
      await actor.saveCallerUserProfile({ name: name.trim(), phoneNumber: phone });
      try {
        await actor.addStudent(name.trim(), phone);
      } catch {
        // Student might already exist
      }
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      queryClient.invalidateQueries({ queryKey: ['student'] });
      toast.success('Profile created successfully! Welcome to Vedansh! 🎓');
    } catch (error) {
      toast.error('Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md bg-vedansh-navy border-white/20 text-white" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-vedansh-orange/20 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-vedansh-orange" />
            </div>
            <div>
              <DialogTitle className="text-white text-xl font-baloo">Welcome to Vedansh!</DialogTitle>
              <DialogDescription className="text-white/60 text-sm">
                Set up your profile to get started
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white/80 text-sm">Your Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-vedansh-orange"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-white/80 text-sm">Mobile Number</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit mobile number"
              className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-vedansh-orange"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={loading || !name.trim() || phone.length !== 10}
            className="w-full bg-vedansh-orange hover:bg-orange-600 text-white font-semibold"
          >
            {loading ? 'Setting up...' : 'Start Learning! 🚀'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
