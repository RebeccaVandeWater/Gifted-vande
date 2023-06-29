import { AppState } from "../AppState.js"
import { giffyApi } from "./AxiosService.js"

class GiffyService {


    async findGift(query) {
        console.log('form data', query)
        const res = await giffyApi.get('', {
            params: {
                q: query
            }
        })
        console.log('search results', res.data)
        const foundGif = res.data.data
        AppState.foundGifts = foundGif


    }

    autopopulate(gifUrl) {
        const foundUrl = gifUrl

        AppState.selectedGif = foundUrl

    }

}

export const giffyService = new GiffyService