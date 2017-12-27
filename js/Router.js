class RouterC {
    constructor(mode, root) {
        this.setMode(mode);
        this.setRoot(root);
        this.routes = [];
        this.interval = null;
        return this;
    }
    setMode(mode) {
        this.mode = mode && mode === 'history' && !!(history.pushState) ? 'history' : 'hash';
        return this;
    }
    setRoot(root) {
        this.root = root ? '/' + RouterC._clearSlashes(root) + '/' : '/';
        return this;
    }
    getFragment() {
        let fragment = '';
        if(this.mode === 'history') {
            fragment = RouterC._clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root !== '/' ? fragment.replace(RouterC._clearSlashes(this.root), '') : fragment;
        } else {
            let match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return RouterC._clearSlashes(fragment);
    }
    add(re, handler) {
        if (typeof re === 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({ 'rout': re, 'handler': handler});
        return this;
    }
    check(f) {
        let fragment = f || this.getFragment();
        for(let i = 0; i < this.routes.length; i++) {
            let match = fragment.match(this.routes[i]['rout']);
            if(match && match['input'] === match['0']) {
                match.shift();
                this.routes[i]['handler'].apply({}, match);
                return this;
            }
        }
        return this;
    }
    listen() {
        let self = this;
        let current = self.getFragment();
        let fn = function() {
            if(current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);

            }
        };
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    }
    navigate(path) {
        path = path ? path : '';
        if(this.mode === 'history') {
            history.pushState(null, null, this.root + RouterC._clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        return this;
    }
    static _clearSlashes(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }
}
let Router = new RouterC('history');