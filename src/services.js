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
    return arrayClean[0]; //TODO
  }

  /**
   * Get the last upcomming event
   * @return {null | Event}
   */
  getLastEvent() {
    let { arrayClean, table } = this.cleanEvent();

    arrayClean.sort(function (a, b) {
      return a.startTime - b.startTime;
    });
    return arrayClean[arrayClean.length - 1]; //TODO
  }

  /**
   * Get the longest event
   * @return {null | Event}
   */
  getLongestEvent() {
    let { arrayClean, table } = this.cleanEvent();

    let time = 0;
    let i = 0;
    let indexLonguest = -1;
    arrayClean.forEach((element) => {
      let timedifference = element.getEndTime() - element.getStartTime();
      if (timedifference > time) {
        time = timedifference;
        indexLonguest = i;
      }
      i++;
    });

    return table[indexLonguest]; //TODO
  }

  cleanEvent() {
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
    return { arrayClean, table };
  }

  /**
   * get the shortest event
   * @return {null | Event}
   */
  getShortestEvent() {
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
    let time = 0;
    let i = 0;
    let indexShortest = -1;
    arrayClean.forEach((element) => {
      let timedifference = element.getEndTime() - element.getStartTime();
      if (timedifference < time || time === 0) {
        time = element.getEndTime() - element.getStartTime();
        indexShortest = i;
      }
      i++;
    });
    return table[indexShortest]; //TODO
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
