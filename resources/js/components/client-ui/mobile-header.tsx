
import { ShoppingCart, MapPin } from "lucide-react"
import { useCartStore } from "@/stores/cart-store"
import { useBranchStore } from "@/stores/branch-store"
import { useState, useEffect } from "react"
import BranchSelectionModal from "@/components/client-ui/branch-selection-modal"
import { Branch, Tenant } from '@/types';
import { Link } from '@inertiajs/react';
import { useTenantStore } from '@/stores/tenant-store';


interface MobileHeaderProps {
  branches?: Branch[]
  tenant?: Tenant
}

export default function MobileHeader({ branches = [] }: MobileHeaderProps) {
  const totalItems = useCartStore((state) => state.getTotalItems())
  const { selectedBranch, setSelectedBranch } = useBranchStore()
  const [showBranchModal, setShowBranchModal] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)
  const { tenant } = useTenantStore();
  const logo_url = tenant?.settings.logo_url ?? null;
  // Check if delivery is allowed
  const isDeliveryAllowed = tenant?.delivery_settings?.allow_delivery ?? false

  // Check if we need to show branch selection modal on initial load
  useEffect(() => {
    if (branches.length > 0 && !hasInitialized) {
      setHasInitialized(true)
      
      // Check if no branch is selected
      if (!selectedBranch) {
        setShowBranchModal(true)
        return
      }
      
      // Check if selected branch exists in current branches list
      const currentBranch = branches.find(branch => branch.id === selectedBranch.id)
      
      if (!currentBranch) {
        // Selected branch not found in current list, show modal
        setShowBranchModal(true)
        return
      }
      
      // Check if selected branch is closed
      if (!currentBranch.is_open) {
        setShowBranchModal(true)
        return
      }
      
      // Update selected branch with current data (in case details changed)
      setSelectedBranch(currentBranch)
    }
  }, [branches, selectedBranch, setSelectedBranch, hasInitialized])

  const handleBranchSelection = (branch: Branch) => {
    setSelectedBranch(branch)
    setShowBranchModal(false)
  }

  const handleBranchButtonClick = () => {
    setShowBranchModal(true)
  }

  return (
    <>
      <header className=" bg-white shadow-sm px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          {logo_url && (
            <div className="flex items-center">
              <img
                src={`https://images.elrestmenu.com/${logo_url}`}
                alt="Logo"
                className="max-h-12 max-w-32 h-auto w-auto object-contain shadow-sm"
              />
            </div>
          )}
          {!logo_url && <span className="text-xl font-bold text-orange-600">{tenant?.settings.display_name}</span>}

          <div className="flex items-center gap-2">
            {/* Branch Selection Button */}
            {branches.length > 0 && (
              <button
                onClick={handleBranchButtonClick}
                className="flex items-center gap-1 p-2 text-gray-600 hover:text-orange-600 transition-colors"
                title="Select Branch"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-xs hidden sm:inline">
                  {selectedBranch ? selectedBranch.name : 'اختر الفرع'}
                </span>
              </button>
            )}

            {/* Cart Button - Only show if delivery is allowed */}
            {isDeliveryAllowed && (
              <Link href="/cart" className="relative p-2">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Branch Selection Modal */}
      <BranchSelectionModal
        isOpen={showBranchModal}
        branches={branches}
        onSelectBranch={handleBranchSelection}
        onClose={() => setShowBranchModal(false)}
      />
    </>
  )
}
