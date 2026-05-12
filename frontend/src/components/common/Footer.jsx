export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#222] bg-[#111] py-12">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-[#ededed] font-medium text-sm mb-4">Product</h3>
            <ul className="space-y-3 text-[#888] text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Movies</li>
              <li className="hover:text-white cursor-pointer transition-colors">Series</li>
              <li className="hover:text-white cursor-pointer transition-colors">Recommendations</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#ededed] font-medium text-sm mb-4">Company</h3>
            <ul className="space-y-3 text-[#888] text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#ededed] font-medium text-sm mb-4">Legal</h3>
            <ul className="space-y-3 text-[#888] text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms</li>
              <li className="hover:text-white cursor-pointer transition-colors">Cookies</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#ededed] font-medium text-sm mb-4">Social</h3>
            <div className="flex flex-col space-y-3 text-[#888] text-sm">
              <a href="#" className="hover:text-white transition-colors">Twitter / X</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#333] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[#666] text-sm">
          <p>© {year} Reelify Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
