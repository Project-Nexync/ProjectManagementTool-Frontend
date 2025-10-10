import '@testing-library/jest-dom'

// Polyfill canvas getContext for Chart.js in jsdom environment used by Vitest
// Chart.js tries to access canvas.getContext which jsdom can't render; override
// the method to avoid 'Not implemented' errors during tests.
if (typeof HTMLCanvasElement !== 'undefined') {
	HTMLCanvasElement.prototype.getContext = function () {
		return {
			fillRect: () => {},
			clearRect: () => {},
			getImageData: (x, y, w, h) => ({ data: new Array(w * h * 4).fill(0) }),
			putImageData: () => {},
			createImageData: () => [],
			setTransform: () => {},
			drawImage: () => {},
			save: () => {},
			restore: () => {},
			beginPath: () => {},
			moveTo: () => {},
			lineTo: () => {},
			closePath: () => {},
			stroke: () => {},
			translate: () => {},
			scale: () => {},
			rotate: () => {},
			arc: () => {},
			fillText: () => {},
			measureText: () => ({ width: 0 }),
			setLineDash: () => {},
			getLineDash: () => [],
			createLinearGradient: () => ({ addColorStop: () => {} }),
		};
	};
}
