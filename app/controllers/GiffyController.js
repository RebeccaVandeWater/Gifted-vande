import { AppState } from "../AppState.js"
import { giffyService } from "../services/GiffyService.js"
import { giftsService } from "../services/GiftsService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawgifs() {
    let template = ''
    let gifts = AppState.foundGifts
    console.log(gifts, 'appstate gifts')
    gifts.forEach(g =>
        template += `
    <div class="col-12 my-2">
    <img onclick="app.GiffyController.autopopulate('${g.images.downsized.url}')" class="img-fluid selectable" src="${g.images.downsized.url}" alt="img not found">
    </div>
    `
    )

    setHTML('foundGif', template)
}

function _drawForm() {
    let gif = AppState.selectedGif

    let template = `
    <form onsubmit="app.GiftsController.createGift(event)">
        <label for="tag">Tag</label>
        <input type="text" name="tag" id="tag">

        <label for="url">URL</label>
        <input type="url" name="url" id="url" value="${gif}">

        <button type="submit" class="btn btn-primary">
            Submit
        </button>
    </form>
    `

    setHTML('populateForm', template)
}

export class GiffyController {
    constructor() {
        console.log('giffy controller')
        AppState.on('foundGifts', _drawgifs)
    }

    async findGift(event) {
        try {
            event.preventDefault()
            const form = event.target
            const formData = getFormData(form)
            await giffyService.findGift(formData.query)
            form.reset()

        } catch (error) {
            console.log(error)
            Pop.error(error.message)

        }
    }

    autopopulate(gifUrl) {
        giffyService.autopopulate(gifUrl)

        _drawForm()
    }
}