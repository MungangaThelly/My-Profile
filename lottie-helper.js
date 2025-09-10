// Lottie animation loader
// Usage: loadLottieAnimation(containerId, animationUrl)
function loadLottieAnimation(containerId, animationUrl, loop = true, autoplay = true) {
  if (!window.lottie) return;
  return window.lottie.loadAnimation({
    container: document.getElementById(containerId),
    renderer: 'svg',
    loop: loop,
    autoplay: autoplay,
    path: animationUrl
  });
}
