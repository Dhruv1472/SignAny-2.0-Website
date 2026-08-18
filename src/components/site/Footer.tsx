import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/SignAnyDarkLogo.png";
import mvLogo from "@/assets/mvclouds-logo.webp";
import { useProductMode } from "@/lib/product-mode";

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 1.9" />
    <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
  </svg>
);

const socialLinks = [
  { name: "WhatsApp", href: "https://wa.me/919558019600?text=Hello%2C%20I%E2%80%99m%20interested%20in%20Sign%20Any%202.0%20Can%20we%20discuss%20further%3F", icon: WhatsAppIcon },
  { name: "LinkedIn", href: "https://www.linkedin.com/showcase/esignany2-0/about/", icon: Linkedin },
  { name: "Instagram", href: "https://www.instagram.com/esignany2.0/", icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/people/Esignany20/61577536805628/", icon: Facebook },
];

const IndiaFlag = () => (
  <span className="w-6 h-4 shrink-0 mt-1 inline-flex items-center justify-center">
    <svg className="w-full h-full block overflow-visible" viewBox="0 0 30 27" fill="none">
      <path d="M 0 3 C 7.5 -1, 22.5 7, 30 3 V 10 C 22.5 14, 7.5 6, 0 10 Z" fill="#FF9933" />
      <path d="M 0 10 C 7.5 6, 22.5 14, 30 10 V 17 C 22.5 21, 7.5 13, 0 17 Z" fill="#FFFFFF" />
      <path d="M 0 17 C 7.5 13, 22.5 21, 30 17 V 24 C 22.5 28, 7.5 20, 0 24 Z" fill="#138808" />
      <circle cx="15" cy="13.5" r="2.3" fill="none" stroke="#000080" strokeWidth="0.8" />
      <path d="M 0 3 C 7.5 -1, 22.5 7, 30 3 V 24 C 22.5 28, 7.5 20, 0 24 Z" fill="none" strokeWidth="1" />
    </svg>
  </span>
);

const UAEFlag = () => (
  <span className="w-6 h-4 shrink-0 mt-1 inline-flex items-center justify-center">
    <svg className="w-full h-full block overflow-visible" viewBox="0 0 30 27" fill="none">
      <path d="M 9 3 C 15 -1, 23 7, 30 3 V 10 C 23 14, 15 6, 9 10 Z" fill="#00732F" />
      <path d="M 9 10 C 15 6, 23 14, 30 10 V 17 C 22.5 21, 7.5 13, 0 17 Z" fill="#FFFFFF" />
      <path d="M 9 17 C 15 13, 23 21, 30 17 V 24 C 22.5 28, 7.5 20, 0 24 Z" fill="#000000" />
      <path d="M 0 3 C 2.5 1.5, 6.5 4.5, 9 3 V 24 C 6.5 25.5, 2.5 22.5, 0 24 Z" fill="#FF0000" />
      <path d="M 0 3 C 2.5 1.5, 6.5 4.5, 9 3 C 15 -1, 23 7, 30 3 V 24 C 23 28, 15 20, 9 24 C 6.5 25.5, 2.5 22.5, 0 24 Z" fill="none" strokeWidth="1" />
    </svg>
  </span>
);

export function Footer() {
  const { setMode } = useProductMode();
  return (
    <footer className="bg-[#0e172a] text-white border-t border-white/10">
      <div className="section-shell pt-20 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand & Social */}
          <div className="lg:col-span-3">
            <Link 
              to="/" 
              className="rounded-lg inline-block mb-6 hover:shadow-md transition-shadow"
            >
              <img 
                src={logo} 
                alt="SignAny 2.0" 
                className="h-8" 
              />
            </Link>
            <p className="text-xs md:text-sm text-white/60 leading-relaxed mb-8">
              The next generation eSignature platform for modern teams. Built for security, speed, and seamless integration across global enterprise workflows.
            </p>
            
            <div className="space-y-6">
              <div className="flex flex-col items-start gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Developed by</span>
                <a 
                  href="https://mvclouds.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:opacity-80 transition-opacity"
                >
                  <img src={mvLogo} alt="MV Clouds" className="h-7 w-auto object-contain brightness-0 invert" />
                </a>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#806cf0] hover:text-white transition-all duration-300 group"
                    aria-label={s.name}
                  >
                    <s.icon size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: SignAny 2.0 Web Links */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-[#806cf0]">SignAny 2.0</h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <a href="/#features" onClick={() => setMode("signany")} className="hover:text-white transition-colors">Core Features</a>
              <a href="/#workspace" onClick={() => setMode("signany")} className="hover:text-white transition-colors">Workspace & Audit</a>
              <a href="/#permissions" onClick={() => setMode("signany")} className="hover:text-white transition-colors">Role Permissions</a>
              <a href="/#api" onClick={() => setMode("signany")} className="hover:text-white transition-colors">REST API Docs</a>
              <a href="/#compliance" onClick={() => setMode("signany")} className="hover:text-white transition-colors">Trust & Compliance</a>
              <a href="/#pricing" onClick={() => setMode("signany")} className="hover:text-white transition-colors">Pricing Plans</a>
              <Link to="/verifyHash" onClick={() => setMode("signany")} className="hover:text-white transition-colors font-semibold text-white/80">Verify Document Hash</Link>
              <Link to="/blog" onClick={() => setMode("signany")} className="hover:text-white transition-colors font-semibold text-white/80">Blog & Insights</Link>
              <Link to="/faqs" onClick={() => setMode("signany")} className="hover:text-white transition-colors font-semibold text-white/80">Full FAQs</Link>
              <Link to="/lifecycle" onClick={() => setMode("signany")} className="hover:text-white transition-colors font-semibold text-white/80">Document Lifecycle</Link>
            </div>
          </div>

          {/* Column 3: Salesforce App Links */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-[#806cf0]">SignAny Salesforce</h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <a href="/#sf-overview" onClick={() => setMode("salesforce")} className="hover:text-white transition-colors">Salesforce Overview</a>
              <a href="/#sf-features" onClick={() => setMode("salesforce")} className="hover:text-white transition-colors">App Capabilities</a>
              <a href="https://login.salesforce.com/packaging/installPackage.apexp?p0=04tdL000000SLsj" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Install AppExchange Package</a>
              <a href="/#compliance" onClick={() => setMode("salesforce")} className="hover:text-white transition-colors">Salesforce Security</a>
              <a href="/#pricing" onClick={() => setMode("salesforce")} className="hover:text-white transition-colors">Enterprise Pricing</a>
              <a href="#book-demo" onClick={() => setMode("salesforce")} className="hover:text-white transition-colors font-semibold text-white/80">Book a Demo</a>
            </div>
          </div>

          {/* Column 4: Global Offices & Support */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-[#806cf0]">Support & Offices</h4>
            <ul className="space-y-6 text-sm text-white/60">
              <li className="flex items-center gap-3 group">
                <Mail size={16} className="text-[#806cf0] flex-shrink-0" />
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@esignany.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">info@esignany.com</a>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone size={16} className="text-[#806cf0] flex-shrink-0" />
                <a href="tel:+919558019600" className="hover:text-white transition-colors">+91 9558019600</a>
              </li>
              <li className="pt-4 border-t border-white/5 space-y-4">
                <div className="flex items-start gap-3">
                  <IndiaFlag />
                  <div className="leading-relaxed">
                    <span className="block font-bold text-white/90 text-[11px] mb-1">India (Headquarter)</span>
                    <span className="text-xs">D-404, The First Synthesis, B/H Keshavbaug Party Plot, Ahmedabad-380015</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UAEFlag />
                  <div className="leading-relaxed">
                    <span className="block font-bold text-white/90 text-[11px] mb-1">U.A.E. Office</span>
                    <span className="text-xs">Meydan Grandstand, 6th floor, Nad Al Sheba, Dubai, U.A.E.</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/30">
          <span><b>© {new Date().getFullYear()} SignAny 2.0. All rights reserved.</b></span>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="hover:text-white/60 transition-colors"><b>Privacy Policy</b></Link>
            <Link to="/terms-and-conditions" className="hover:text-white/60 transition-colors"><b>Terms of Service</b></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
