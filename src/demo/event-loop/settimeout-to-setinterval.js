// settimeout 实现 interval
;(() => {
	const list = new Set();
	function oInterval(fn, ms) {
		const ref = {};
		const exec = () => {
			return setTimeout(() => {
				fn.apply(null);
				const timer = exec();
				ref.current = timer;
			}, ms)
		};
		ref.current = exec();
		list.add(ref);
		return ref;
	}

	function oClearInterval(ref) {
		clearTimeout(ref.current);
		list.delete(ref);
	}

	window.oInterval = oInterval;
	window.oClearInterval = oClearInterval;
})()