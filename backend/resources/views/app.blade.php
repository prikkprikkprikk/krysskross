<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KryssKross</title>
    @php
      $manifestPath = public_path('dist/.vite/manifest.json');
      $hasBuiltAssets = file_exists($manifestPath);
    @endphp

    @if (!$hasBuiltAssets && app()->environment('local'))
      {{-- Development mode: Vite dev server --}}
      <script type="module" src="http://localhost:5173/@@vite/client"></script>
      <script type="module" src="http://localhost:5173/src/main.tsx"></script>
    @elseif ($hasBuiltAssets)
      {{-- Production mode: Built assets --}}
      @php
        $manifest = json_decode(file_get_contents($manifestPath), true);
        $mainJs = $manifest['src/main.tsx']['file'] ?? null;
        $mainCss = $manifest['src/main.tsx']['css'][0] ?? null;
      @endphp
      @if ($mainCss)
        <link rel="stylesheet" href="{{ asset('dist/' . $mainCss) }}">
      @endif
      @if ($mainJs)
        <script type="module" src="{{ asset('dist/' . $mainJs) }}"></script>
      @endif
    @endif
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
