export class Gift {
    constructor(data) {
        this.id = data._id || ''
        this.tag = data.tag
        this.url = data.url || 'https://images.unsplash.com/photo-1598121554761-e7925271e9b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
        this.opened = data.opened || false
    }

    get GiftTemplate() {
        return /*html*/`
        <div class="elevation-5 col-md-4 col-12">
            <button onclick="app.GiftsController.openGift('${this.id}')" class="btn btn-success">Open?</button>
            <img class="img-fluid selectable" src="${this.url}" alt="${this.url}">
            <p>${this.tag}</p>
        </div>
        `
    }
}