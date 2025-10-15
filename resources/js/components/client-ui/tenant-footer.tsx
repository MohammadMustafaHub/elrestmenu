"use client"

import { Clock } from "lucide-react"
import { useTenantStore } from "@/stores/tenant-store"

export default function TenantFooter() {
  const { tenant } = useTenantStore()
  // Default values for fallback
  const defaultInfo = {
    name: "اسم مطعمك هنا",
    logo: "",
  }

  // Extract data from tenant or use defaults
  const restaurantName = tenant?.settings?.display_name || defaultInfo.name
  const restaurantLogo = `https://images.elrestmenu.com/${tenant?.settings?.logo_url || defaultInfo.logo}`
  const workingDays = tenant?.settings?.working_days || []
  const workingStarts = tenant?.settings?.working_starts || "10:00"
  const workingEnds = tenant?.settings?.working_ends || "23:00"

  // const quickLinks = [
  //   { name: "الرئيسية", href: "/" },
  //   { name: "القائمة", href: "#menu" },
  //   { name: "العروض", href: "#offers" },
  //   { name: "من نحن", href: "#about" },
  //   { name: "اتصل بنا", href: "#contact" },
  // ]

  // Generate working hours from tenant data
  const getWorkingHours = () => {
    if (!workingDays.length) {
      return [
        { day: "جميع الأيام", hours: `${convertTo12Hour(workingStarts)} - ${convertTo12Hour(workingEnds)}` }
      ]
    }

    const dayNames: { [key: string]: string } = {
      sunday: "الأحد",
      monday: "الاثنين",
      tuesday: "الثلاثاء",
      wednesday: "الأربعاء",
      thursday: "الخميس",
      friday: "الجمعة",
      saturday: "السبت",
    }

    // Group consecutive days
    const translatedDays = workingDays.map(day => dayNames[day.toLowerCase()] || day)

    if (workingDays.length === 7) {
      return [{ day: "جميع الأيام", hours: `${convertTo12Hour(workingStarts)} - ${convertTo12Hour(workingEnds)}` }]
    } else if (workingDays.length > 3) {
      return [{ day: translatedDays.join(" - "), hours: `${convertTo12Hour(workingStarts)} - ${convertTo12Hour(workingEnds)}` }]
    } else {
      return translatedDays.map(day => ({
        day,
        hours: `${convertTo12Hour(workingStarts)} - ${convertTo12Hour(workingEnds)}`
      }))
    }
  }

  // Function to convert 24-hour time to 12-hour format
  const convertTo12Hour = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'م' : 'ص'
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  const workingHours = getWorkingHours()

  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Restaurant Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {restaurantLogo && (
                <img
                  src={restaurantLogo}
                  alt={`شعار ${restaurantName}`}
                  className="w-12 h-12 object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = defaultInfo.logo
                  }}
                />
              )}
              <h3 className="text-2xl font-bold text-orange-400">{restaurantName}</h3>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-orange-400">ساعات العمل</h4>
            <div className="space-y-2">
              {workingHours.map((schedule, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-gray-300 font-medium">{schedule.day}</p>
                    <p className="text-gray-400">{schedule.hours}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
