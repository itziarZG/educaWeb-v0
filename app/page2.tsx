export function HomePage2() {
    return (
      <!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>EDUCAWEB - Educación Personalizada</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#13ec5b",
        "background-light": "#f6f8f6",
        "background-dark": "#102216",
      },
      fontFamily: { "display": ["Lexend"] },
      borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
    },
  },
}
</script>
<style>
body { font-family: 'Lexend', sans-serif; }
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
body { min-height: max(884px, 100dvh); }
</style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 selection:bg-primary/30">

<!-- Top Navigation Bar -->
<header class="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
<div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
  <div class="flex items-center gap-2">
    <div class="bg-primary/20 p-1.5 rounded-lg">
      <span class="material-symbols-outlined text-primary text-2xl font-bold">school</span>
    </div>
    <h2 class="text-[#111813] dark:text-white text-lg font-bold leading-tight tracking-tight">EDUCAWEB</h2>
  </div>
  <div class="flex items-center gap-6">
    <a class="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="#">Login</a>
    <button class="bg-primary hover:bg-primary/90 text-[#111813] px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-sm">
      Probar gratis
    </button>
  </div>
</div>
</header>

<main class="w-full">

<!-- Hero Section -->
<section class="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
<div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
  <div class="flex flex-col gap-8">
    <div class="inline-flex items-center gap-2 bg-primary/10 text-slate-800 dark:text-primary-100 px-3 py-1 rounded-full w-fit">
      <span class="material-symbols-outlined text-sm">auto_awesome</span>
      <span class="text-xs font-bold tracking-wide uppercase">Aprendizaje Personalizado</span>
    </div>
    <div class="space-y-4">
      <h1 class="text-4xl lg:text-6xl font-black text-[#111813] dark:text-white leading-[1.1] tracking-tight">
        Devuelve la <span class="text-primary underline decoration-primary/20 underline-offset-8">calma</span> a tus tardes
      </h1>
      <p class="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
        Actividades personalizadas que conectan los intereses de tu hijo con su curso. Estudio efectivo, motivador y sin estrés.
      </p>
    </div>
    <div class="flex flex-col sm:flex-row gap-4">
      <button class="bg-primary hover:bg-primary/90 text-[#111813] px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
        Empieza gratis ahora
        <span class="material-symbols-outlined">arrow_forward</span>
      </button>
      <div class="flex items-center gap-3 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl">
        <div class="flex -space-x-2">
          <div class="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>
          <div class="w-8 h-8 rounded-full border-2 border-white bg-slate-300"></div>
          <div class="w-8 h-8 rounded-full border-2 border-white bg-slate-400"></div>
        </div>
        <span class="text-xs font-medium text-slate-500">+500 familias probando</span>
      </div>
    </div>
  </div>
  <div class="relative">
    <div class="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-30"></div>
    <div class="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAEuNJ-VJNWX4ukpQHGhJKfmyH8-v-8cTcaweu1yclAbV17tCytS9KGamN91f1GuOQjCct0rG5id7Taohu-MEYCsIsFAI7kHfjqdOSilm9nPdKOSIXgCKWgntSvsWwjFK-D_xSyEKYe-qKltTDhv4le_1NYbqGqVUqCGRI8ctbvivfw_ljU1fQvZdGlc_pCWwx1Qp0HwIMhYTpVn-H_yPJeJkdCU_srAXdEpdDqzvG3XGOMR5sc9JG3-uQfI4V-Yi1OLmrVsf-YKPk"); background-size: cover; background-position: center;'></div>
  </div>
</div>
</section>

<!-- Features Grid -->
<section class="py-24 bg-white dark:bg-slate-900/50">
<div class="max-w-7xl mx-auto px-4">
<div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
<h2 class="text-3xl lg:text-4xl font-black text-[#111813] dark:text-white">Educación que conecta con tu hijo</h2>
<p class="text-slate-600 dark:text-slate-400">Combinamos tecnología y métodos tradicionales para un aprendizaje efectivo, emocional y sin pantallas.</p>
</div>
<div class="grid md:grid-cols-3 gap-8">

<!-- Feature 1 -->
<div class="bg-background-light dark:bg-background-dark p-8 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all group">
<div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-primary text-3xl">psychology</span>
</div>
<h3 class="text-xl font-bold mb-3 dark:text-white">Personalización inmediata</h3>
<p class="text-slate-600 dark:text-slate-400 leading-relaxed">Actividades adaptadas al curso y los gustos de cada hijo, listas para imprimir y usar sin complicaciones.</p>
</div>

<!-- Feature 2 -->
<div class="bg-background-light dark:bg-background-dark p-8 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all group">
<div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-primary text-3xl">edit_square</span>
</div>
<h3 class="text-xl font-bold mb-3 dark:text-white">Confianza y motivación</h3>
<p class="text-slate-600 dark:text-slate-400 leading-relaxed">Celebramos cada acierto y fomentamos la autoestima con un sistema de refuerzo positivo tangible y divertido.</p>
</div>

<!-- Feature 3 -->
<div class="bg-background-light dark:bg-background-dark p-8 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all group">
<div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-primary text-3xl">auto_stories</span>
</div>
<h3 class="text-xl font-bold mb-3 dark:text-white">Gamificación física</h3>
<p class="text-slate-600 dark:text-slate-400 leading-relaxed">Al completar actividades, tu hijo recibe recompensas tangibles que hacen visible su progreso y logros.</p>
</div>

</div>
</div>
</section>

<!-- Product Showcase -->
<section class="py-24">
<div class="max-w-7xl mx-auto px-4">
<div class="bg-primary/5 rounded-[2rem] p-8 lg:p-16 overflow-hidden relative">
<div class="grid lg:grid-cols-2 gap-12 items-center relative z-10">
<div class="space-y-6">
<h2 class="text-3xl lg:text-5xl font-black text-[#111813] dark:text-white leading-tight">Del mundo digital al papel real</h2>
<p class="text-lg text-slate-700 dark:text-slate-300">Nuestra IA genera el contenido, pero el aprendizaje ocurre en el papel. Evita la fatiga digital y recupera la conexión física con el estudio.</p>
<ul class="space-y-4">
<li class="flex items-center gap-3">
<div class="bg-primary text-white p-1 rounded-full"><span class="material-symbols-outlined text-xs font-bold">check</span></div>
<span class="font-medium dark:text-slate-200">Fichas PDF listas para imprimir</span>
</li>
<li class="flex items-center gap-3">
<div class="bg-primary text-white p-1 rounded-full"><span class="material-symbols-outlined text-xs font-bold">check</span></div>
<span class="font-medium dark:text-slate-200">Guía para padres incluida</span>
</li>
<li class="flex items-center gap-3">
<div class="bg-primary text-white p-1 rounded-full"><span class="material-symbols-outlined text-xs font-bold">check</span></div>
<span class="font-medium dark:text-slate-200">Gamificación física y motivadora</span>
</li>
</ul>
</div>
<div class="grid grid-cols-2 gap-4">
<div class="aspect-square bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 rotate-3 border-4 border-white dark:border-slate-700" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBd7OsKkM0BQ6n24HOkz7p0guJ6bfusvkPfEIRe_lxcsxs_l6atjpHc39yawDuTt7YygOnqv9GYd4G9sAMv5chX1eH3Ahe0jY46JHfJohgsbFGU6IB8pBiGpviEil--RMJGT8PODmlM9lMkF9UCDE7aK_XFl6hXP2EuOBO7gpGLN-1U6hCwnO0Dvv4Ikx1l1I0q0ktQDBhEcpmWsBUhyKGPAcVYIEmdCB7XfHisQSjt7B8sdJN1-9nbpY8KL9tu4D-oHCcpt5qwdH4"); background-size: cover;'></div>
<div class="aspect-square bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 -rotate-3 border-4 border-white dark:border-slate-700 mt-12" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBwtUJsfiQ72wkoexFfB5ogofk_5h2Bs32sDKmXbndpplK93eySIBoEol3FDj7Ojq5iF34qwWhugMwRrF_gD5NUcy7Z-oaXEs4pcEDN1g4M__cAfLEXKWpOk7Q7gLCubUxV1QGIVYedPuzZCDdecSEwTWNRnP3QTYRR4d5_VbuyXFZsqlol8dCJkSKiCpyusKKpKR9RU9CR2cB9tu2cBfLHSQjAtQReTlzeyHP8v9pyxDFhhcp7G1_LzmLZamS_pfENUJyZJKUU_JU"); background-size: cover;'></div>
</div>
</div>
</div>
</div>
</section>

<!-- Stats Section -->
<section class="py-16 bg-background-light dark:bg-background-dark/50">
<div class="max-w-7xl mx-auto px-4">
<div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
<div class="flex flex-col items-center text-center gap-2">
<p class="text-primary text-4xl lg:text-5xl font-black">500+</p>
<p class="text-sm font-bold text-slate-500 uppercase tracking-widest">Familias Felices</p>
</div>
<div class="flex flex-col items-center text-center gap-2">
<p class="text-primary text-4xl lg:text-5xl font-black">10k+</p>
<p class="text-sm font-bold text-slate-500 uppercase tracking-widest">Fichas Generadas</p>
</div>
<div class="flex flex-col items-center text-center gap-2">
<p class="text-primary text-4xl lg:text-5xl font-black">98%</p>
<p class="text-sm font-bold text-slate-500 uppercase tracking-widest">Aprobado Escolar</p>
</div>
<div class="flex flex-col items-center text-center gap-2">
<p class="text-primary text-4xl lg:text-5xl font-black">0</p>
<p class="text-sm font-bold text-slate-500 uppercase tracking-widest">Estrés en Casa</p>
</div>
</div>
</div>
</section>

<!-- CTA Section -->
<section class="py-24">
<div class="max-w-4xl mx-auto px-4 text-center">
<div class="bg-slate-900 dark:bg-slate-800 p-12 lg:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
<div class="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
<div class="relative z-10 space-y-8">
<h2 class="text-4xl lg:text-5xl font-black text-white leading-tight">Transforma la hora de estudio</h2>
<p class="text-slate-400 text-lg">Únete a otras familias que ya están recuperando sus tardes. Empieza hoy tu prueba gratuita y personaliza el aprendizaje de tus hijos.</p>
<div class="flex flex-col items-center gap-4">
<button class="bg-primary hover:bg-primary/90 text-[#111813] px-12 py-5 rounded-2xl text-xl font-black transition-all shadow-xl shadow-primary/20 w-full sm:w-auto">
  Probar gratis 7 días
</button>
<p class="text-slate-500 text-sm">Sin compromiso. Cancela en cualquier momento.</p>
</div>
</div>
</div>
</div>
</section>

</main>

<footer class="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-12">
<div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-2xl font-bold">school</span>
<span class="text-[#111813] dark:text-white font-bold text-lg uppercase tracking-wider">EDUCAWEB</span>
</div>
<nav class="flex gap-8">
<a class="text-slate-500 hover:text-primary transition-colors text-sm" href="#">Privacidad</a>
<a class="text-slate-500 hover:text-primary transition-colors text-sm" href="#">Términos</a>
<a class="text-slate-500 hover:text-primary transition-colors text-sm" href="#">Contacto</a>
<a class="text-slate-500 hover:text-primary transition-colors text-sm" href="#">Blog</a>
</nav>
<p class="text-slate-400 text-sm">© 2026 EDUCAWEB. Hecho con ❤️ para familias.</p>
</div>
</footer>

<!-- Sticky Mobile CTA -->
<div class="md:hidden fixed bottom-6 left-6 right-6 z-50">
<button class="w-full bg-primary text-[#111813] py-4 rounded-xl font-black shadow-2xl flex items-center justify-center gap-2 border-2 border-white/20">
<span class="material-symbols-outlined">rocket_launch</span>
Empieza Gratis
</button>
</div>

</body>
</html>

    );
}