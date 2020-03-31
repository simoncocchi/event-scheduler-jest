import {Event} from "./models"

export class EventSerializer {
    /**
     *
     * @param {Event| Event[]} event
     * @return {string}
     */
    serialize(event){
        return JSON.stringify(event);
    }

    /**
     *
     * @return {Event | Event[]}
     * @param {string} event
     */
    unserialize(event){
        return []; //TODO
    }
}