import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Studio", href: "/studio" },
        { label: "Templates", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Features", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Community", href: "#" },
        { label: "Contact", href: "#" },
        { label: "FAQ", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: "twitter", label: "Twitter", href: "https://twitter.com" },
    { icon: "instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "facebook", label: "Facebook", href: "https://facebook.com" },
    { icon: "github", label: "GitHub", href: "https://github.com" },
  ];

  const SocialIcon = ({ icon }) => {
    const iconPaths = {
      twitter: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
        </svg>
      ),
      instagram: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8A4 4 0 0116 11.37Z" />
          <circle cx="17.5" cy="6.5" r="1.5" />
        </svg>
      ),
      facebook: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z" />
        </svg>
      ),
      github: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.544 2.914 1.186.092-.921.35-1.545.636-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ),
    };

    return iconPaths[icon] || null;
  };

  return (
    <footer
      style={{
        background:
          "linear-gradient(180deg, rgba(224,246,255,0.8), rgba(173,216,230,0.6))",
        borderTop: "1px solid rgba(0,102,204,0.2)",
        color: "#001a33",
      }}
      className="mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <span className="font-bold text-lg" style={{ color: "#001a33" }}>
                Dress Customizer
              </span>
            </div>
            <p className="text-sm mb-6" style={{ color: "#0066cc" }}>
              Design custom dresses with AI-powered creativity.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg,#0066cc 0%,#0099ff 100%)",
                    color: "white",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-2px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <SocialIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4" style={{ color: "#001a33" }}>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm hover:underline transition-colors"
                      style={{ color: "#0066cc" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div
          className="rounded-lg p-8 mb-12"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,102,204,0.1), rgba(0,153,255,0.08))",
            border: "1px solid rgba(0,102,204,0.2)",
          }}
        >
          <div className="max-w-md">
            <h3
              className="font-semibold text-lg mb-2"
              style={{ color: "#001a33" }}
            >
              Subscribe to our newsletter
            </h3>
            <p className="text-sm mb-4" style={{ color: "#0066cc" }}>
              Get updates on new features and special offers.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg"
                style={{
                  border: "1px solid rgba(0,102,204,0.3)",
                  background: "rgba(255,255,255,0.8)",
                  color: "#001a33",
                }}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg font-medium text-white"
                style={{
                  background: "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
                  boxShadow: "0 4px 12px rgba(0,102,204,0.2)",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="border-t pt-8"
          style={{ borderColor: "rgba(0,102,204,0.2)" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: "#0066cc" }}>
              © {currentYear} Dress Customizer. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm hover:underline transition-colors"
                style={{ color: "#0066cc" }}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm hover:underline transition-colors"
                style={{ color: "#0066cc" }}
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm hover:underline transition-colors"
                style={{ color: "#0066cc" }}
              >
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
