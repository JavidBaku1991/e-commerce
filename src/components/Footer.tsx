const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-center py-6 mt-10 border-t">
      <div className="flex flex-col md:flex-row items-center justify-between px-6">
        <span className="text-sm text-gray-500">© 2025 ShopEase. All rights reserved.</span>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-blue-600 text-sm">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 text-sm">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
