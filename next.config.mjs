const nextConfig = {
  output: 'export', // To jest KLUCZOWE - mówi Next.js, żeby wygenerował statyczne pliki
  images: {
    unoptimized: true, // Firebase Hosting nie obsługuje automatycznej optymalizacji obrazów Next.js
  },
};

export default nextConfig;