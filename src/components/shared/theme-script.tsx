export function ThemeScript() {
  const script = `
    (function () {
      try {
        var stored = localStorage.getItem('prysmalgo-theme');
        var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.style.colorScheme = theme;
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
