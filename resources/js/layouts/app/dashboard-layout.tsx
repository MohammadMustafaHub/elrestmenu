import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Package,
  Tags,
  Building2,
  Settings,
  Bell,
  LogOut,
  Share2,
  Copy,
  ExternalLink,
  CarTaxiFront,
  Sun,
  Moon,
} from "lucide-react";
import { Link, router, usePage } from '@inertiajs/react';
import { useAppearance } from "@/hooks/use-appearance";
import { SharedData } from '@/types';
import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import QrGenerator from '@/components/qr-generator';
import LimitModal from '@/components/limit-modal';
import { useState } from 'react';

const navigation = [
  {
    name: "لوحة التحكم",
    href: "/dashboard",
    icon: LayoutDashboard,
    group: null,
  },
  {
    name: "القائمة",
    group: "menu",
    items: [
      { name: "المنتجات", href: "/dashboard/products", icon: Package },
      { name: "الفئات", href: "/dashboard/categories", icon: Tags },
    ],
  },
  {
    name: "الإدارة",
    group: "management",
    items: [
      { name: "الفروع", href: "/dashboard/branches", icon: Building2 },
      {
        name: "اعدادات التوصيل",
        href: "/dashboard/delivery",
        icon: CarTaxiFront,
      },
      { name: "إعدادات المطعم", href: "/dashboard/settings", icon: Settings },
    ],
  },
  {
    name: "الاشتراك",
    group: "subscription",
    items: [{ name: "الاشتراك", href: "/dashboard/subscription", icon: Tags }],
  },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { url } = usePage();
  const pathname = url;
  const { tenant, auth, errors } = usePage<SharedData>().props
  const [limitModal, setLimitModalOpen] = useState(errors['limitError'] ? true : false);

  const restaurantUrl = `${tenant.name}.elrestmenu.com`
  const theme = useAppearance();


  function getAvatarFallback(){
    return auth.user.name[0].toUpperCase();
  }

  const handleCopyUrl = async () => {
    try {
        await navigator.clipboard.writeText(`https://${restaurantUrl}`);
    } catch (err) {
        console.log(err);
    }
  };

  async function handleLogout() {
      router.post(AuthenticatedSessionController.destroy());
  }

  const handleSocialShare = (platform: string) => {
    const url = `https://${restaurantUrl}`;
    const text = "تفضل بزيارة مطعمنا واطلب أشهى الأطباق!";

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "x":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(text)}`;
        break;
      case "instagram":
        // Instagram doesn't support direct URL sharing, so we copy to clipboard
        handleCopyUrl();
        return;
      case "tiktok":
        // TikTok doesn't have a direct share URL, so we copy to clipboard
        handleCopyUrl();
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <SidebarProvider>
      <Sidebar side="right" className="border-l-0 border-r">
        <SidebarHeader className="p-0">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package className="h-6 w-6" />
              <span>نظام الادارة</span>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navigation.map((item) => {
                if (item.group === null) {
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                      >
                        <Link href={item.href!} className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <div key={item.name}>
                    <SidebarGroupLabel className="mb-2 mt-4">
                      {item.name}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {item.items?.map((subItem) => (
                          <SidebarMenuItem key={subItem.name}>
                            <SidebarMenuButton
                              asChild
                              isActive={pathname === subItem.href}
                            >
                              <Link href={subItem.href} className="flex items-center gap-3 mr-2">
                                <subItem.icon className="h-4 w-4" />
                                <span>{subItem.name}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />

          <Button
            variant="outline"
            size="icon"
            className="ml-auto h-8 w-8 bg-transparent invisible"
          >
            <Bell className="h-4 w-4" />
            <span className="sr-only">الإشعارات</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
              >
                {theme.appearance === "light" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span className="sr-only">تبديل الوضع</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>اختر المظهر</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => theme.updateAppearance("light")}>
                <Sun className="ml-2 h-4 w-4" />
                <span>فاتح</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => theme.updateAppearance("dark")}>
                <Moon className="ml-2 h-4 w-4" />
                <span>داكن</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => theme.updateAppearance("system")}>
                <Settings className="ml-2 h-4 w-4" />
                <span>النظام</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">مشاركة المطعم</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    مشاركة رابط المطعم
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <code
                      className="text-xs bg-muted px-2 py-1 rounded flex-1 text-left"
                      dir="ltr"
                    >
                      {restaurantUrl}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={handleCopyUrl}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSocialShare("facebook")}>
                <div className="ml-2 h-4 w-4 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">f</span>
                </div>
                <span>مشاركة على فيسبوك</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSocialShare("x")}>
                <div className="ml-2 h-4 w-4 bg-black rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">𝕏</span>
                </div>
                <span>مشاركة على X</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSocialShare("instagram")}>
                <div className="ml-2 h-4 w-4 bg-gradient-to-br from-purple-600 to-pink-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">📷</span>
                </div>
                <span>نسخ للانستغرام</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSocialShare("tiktok")}>
                <div className="ml-2 h-4 w-4 bg-black rounded flex items-center justify-center">
                  <span className="text-white text-xs">♪</span>
                </div>
                <span>نسخ لتيك توك</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleCopyUrl}>
                <Copy className="ml-2 h-4 w-4" />
                <span>نسخ الرابط</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  window.open(`https://${restaurantUrl}`, "_blank")
                }
              >
                <ExternalLink className="ml-2 h-4 w-4" />
                <span>فتح المطعم</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>
                <div className="flex flex-col items-center space-y-2 py-2">
                  <p className="text-sm font-medium">QR Code للمطعم</p>
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                     <QrGenerator url={`https://${restaurantUrl}`} showDownload={true} />
                    {/*<div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">*/}
                    {/*  QR Code*/}
                    {/*</div>*/}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    امسح الكود للوصول للمطعم
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    alt="المستخدم"
                  />
                  <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{auth.user.name}</p>
                   <p className="text-xs leading-none text-muted-foreground">{auth.user.phone}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="ml-2 h-4 w-4" />
                <span>تسجيل الخروج</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {limitModal && ( <LimitModal isOpen={limitModal} onClose={() => setLimitModalOpen(false)} />)}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
