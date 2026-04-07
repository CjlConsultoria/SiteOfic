export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm">
          &copy; 2026 CJL Consultoria - Todos os direitos reservados
        </p>
        <p className="text-gray-500 text-xs mt-2">Feito no Brasil</p>
        <div className="flex items-center justify-center gap-6 mt-4">
          <a
            href="https://wa.me/5511940090003"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-200"
          >
            WhatsApp
          </a>
          <a
            href="https://www.cjlconsultoria.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-200"
          >
            www.cjlconsultoria.com
          </a>
        </div>
      </div>
    </footer>
  );
}
