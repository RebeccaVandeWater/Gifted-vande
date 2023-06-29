import { AppState } from "../AppState.js"
import { giftsService } from "../services/GiftsService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawGifts() {
    const gift = AppState.myGifts

    let template = ''

    gift.forEach(g => template += g.GiftTemplate)

    setHTML('giftList', template)
}

export class GiftsController {
    constructor() {
        console.log("Gifts Controller Loaded.")

        this.loadGifts()

        AppState.on('myGifts', _drawGifts)
    }

    async loadGifts() {
        try {
            await giftsService.loadGifts()
        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }

    async openGift(giftId) {
        try {
            await giftsService.openGift(giftId)

        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }


    async createGift(event) {
        try {
            event.preventDefault()

            const form = event.target

            const formData = getFormData(form)

            await giftsService.createGift(formData)
        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }



}
