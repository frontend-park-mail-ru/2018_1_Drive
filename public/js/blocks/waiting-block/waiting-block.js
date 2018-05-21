export class WaitingBLock {
    constructor(root, template) {
        this.root = root;
        this.template = template;
    }

    render() {
        this.root.innerHTML = this.template();
    }
}
