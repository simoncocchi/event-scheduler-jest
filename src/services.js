import EventRepository from "./repository";
import Event from "./models";

export default class EventService {
  /**
   * The event repository
   * @type {EventRepository}
   */
  _eventRepository;

  /**
   *
   * @param {EventRepository} eventRepository
   */
  constructor(eventRepository) {
    this._eventRepository = eventRepository;
  }

  /**
   * Return all events
   * @return {Event[]}
   */
  getEvents() {
    return this._eventRepository.getAll();
  }

  /**
   * Get the first upcomming event
   * @return {null | Event}
   */
  getFirstEvent() {
    let table = this._eventRepository.getAll();
    let arrayClean = [];
    table.forEach((element) => {
      let startTime = element.getStartTime();
      let endTime = element.getEndTime();
      if (startTime > endTime) {
        arrayClean.push(
          new Event(
            element.getEndTime(),
            element.getStartTime(),
            element.getTitle(),
            element.getLocation(),
            element.getDescription()
          )
        );
      } else {
        arrayClean.push(element);
      }
    });
    arrayClean.sort(function (a, b) {
      return a.startTime - b.startTime;
    });
    console.log(arrayClean);
    return arrayClean[0]; //TODO
  }

  /**
   * Get the last upcomming event
   * @return {null | Event}
   */
  getLastEvent() {
    return null; //TODO
  }

  /**
   * Get the longest event
   * @return {null | Event}
   */
  getLongestEvent() {
    return null; //TODO
  }

  /**
   * get the shortest event
   * @return {null | Event}
   */
  getShortestEvent() {
    return null; //TODO
  }

  // A implementer en TDD
  /**
   *
   * @param {Date} time
   * @return {Event[]}
   */
  hasEventOn(time) {
    let evts = this._eventRepository.getAll();
    return evts.filter(function (e) {
      return time >= e.getStartTime() && time <= e.getEndTime();
    });
  }

  // A implementer en TDD
  /**
   *
   * @param title
   * @return {null | Event}
   */
  getEventByTitle(title) {
    return null;
  }

  // A implementer en TDD
  /**
   *
   * @param {Date} time
   */
  isLocationAvailable(time) {}

  /**
   * Get current events
   * @return {Event[]}
   */
  getCurrentEvents() {
    let now = Date.now();
    return this.hasEventOn(new Date(now));
  }
}
