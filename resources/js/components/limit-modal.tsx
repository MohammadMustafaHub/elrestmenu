import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Link } from '@inertiajs/react';
import { Crown } from 'lucide-react';


export default function LimitModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {/*<Crown className="w-5 h-5 text-yellow-500" />*/}
                        وصلت للحد الأقصى من الفروع
                    </DialogTitle>
                    <DialogDescription>
                        لقد وصلت للحد الأقصى من الفروع المسموح بها في خطتك الحالية. لترقية اشتراكك والوصول إلى المزيد من الفروع، يرجى النقر على زر "ترقية الاشتراك" أدناه.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => onClose()} variant="outline">
                        إلغاء
                    </Button>
                    <Button asChild>
                        <Link href="/subscription">
                            <Crown className="w-4 h-4 ml-2" />
                            ترقية الاشتراك
                        </Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
