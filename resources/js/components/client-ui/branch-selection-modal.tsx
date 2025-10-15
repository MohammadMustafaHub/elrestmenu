import { useState, useEffect } from "react"
import { MapPin, X } from "lucide-react"
import { useBranchStore } from "@/stores/branch-store"
import { Branch } from '@/types';



interface BranchSelectionModalProps {
  isOpen: boolean
  branches: Branch[]
  onSelectBranch: (branch: Branch) => void
  onClose: () => void
}

export default function BranchSelectionModal({ isOpen, branches, onSelectBranch, onClose }: BranchSelectionModalProps) {
  const { selectedBranch: storedBranch, setSelectedBranch } = useBranchStore()
  const [selectedBranch, setLocalSelectedBranch] = useState<Branch | null>(storedBranch)

  useEffect(() => {
    if (branches.length === 1) {
      const singleBranch = branches[0]
      setSelectedBranch(singleBranch)
      onSelectBranch(singleBranch)
      onClose()
    }
  }, [branches, setSelectedBranch, onSelectBranch, onClose])

  if (!isOpen || branches.length <= 1) return null

  const handleConfirm = () => {
    if (selectedBranch) {
      setSelectedBranch(selectedBranch)
      onSelectBranch(selectedBranch)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold mb-2">اختر الفرع الأقرب إليك</h2>
            <p className="text-orange-100 text-sm">حدد الفرع المناسب لك للحصول على أفضل خدمة توصيل</p>
          </div>
        </div>

        {/* Branches List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {branches.map((branch) => (
              <div
                key={branch.id}
                onClick={() => setLocalSelectedBranch(branch)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedBranch?.id === branch.id
                    ? "border-orange-500 bg-orange-50 shadow-md"
                    : "border-gray-200 hover:border-orange-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Branch Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedBranch?.id === branch.id ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <MapPin className="w-5 h-5" />
                  </div>

                  {/* Branch Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{branch.name}</h3>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          branch.is_open ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {branch.is_open ? "مفتوح" : "مغلق"}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{branch.address}</span>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {selectedBranch?.id === branch.id && (
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleConfirm}
            disabled={!selectedBranch}
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${
              selectedBranch
                ? "bg-orange-600 hover:bg-orange-700 text-white shadow-md"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {selectedBranch ? `تأكيد اختيار ${selectedBranch.name}` : "اختر فرعاً للمتابعة"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">يمكنك تغيير الفرع في أي وقت من الإعدادات</p>
        </div>
      </div>
    </div>
  )
}
