import Event from "../src/models";
import EventRepository from "../src/repository";
import EventService from "../src/services";
jest.mock("../src/repository");


describe("Event Service",()=> {

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        EventRepository.mockClear();
        EventRepository.mockImplementation(() => {
            return {
                getAll: () => fakeEvents.slice()
            }
        });
    });

    let fakeEvents = [
        new Event(new Date('2019-12-17T03:24:00'),new Date('2019-12-17T13:24:00'),"Hello World","Campus Numerique","This is an hello world.."),
        new Event(new Date('2018-12-17T03:24:00'),new Date('1995-12-17T03:24:00'),"First event","Campus Numerique","This is an hello world.."),
        new Event(new Date('2020-04-01T09:00:00'),new Date('2020-04-01T17:00:00'),"Unit test againt","Campus Numerique","This is an hello world..")
    ];

    test('getEvents shall call repository', async () => {
        let eventService = new EventService(new EventRepository());
        eventService.getEvents();
        expect(EventRepository).toHaveBeenCalledTimes(1);
    })

    test('getEvents shall return 4 result', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEvents().length).toBe(3);
    })

    test('getFirstEvent shall return the first event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getFirstEvent().getStartTime()).toStrictEqual(new Date('1995-12-17T03:24:00'));
    })

    test('getLastEvent shall return the last event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLastEvent().getStartTime()).toStrictEqual(new Date('2020-04-01T09:00:00'));
    })

    test('getLongestEvent shall return the longuest event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLongestEvent()).toStrictEqual(new Event(new Date('2018-12-17T03:24:00'),new Date('1995-12-17T03:24:00'),"First event","Campus Numerique","This is an hello world.."));
    })

    test('hasEventOn shall return the event still on', async () => {
        let eventService = new EventService(new EventRepository());
        var date = new Date().toISOString();
        expect(eventService.hasEventOn(date)).toStrictEqual(new Event(new Date('2020-04-01T09:00:00'),new Date('2020-04-01T17:00:00'),"Unit test againt","Campus Numerique","This is an hello world.."));
    })

});