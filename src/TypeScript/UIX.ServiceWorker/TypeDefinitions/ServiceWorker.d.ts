interface ExtendableEvent extends Event {
	waitUntil(fn: Promise<any>): void;
}

interface InstallEvent extends ExtendableEvent{

}


interface ActivateEvent extends ExtendableEvent {
}

declare var clients:Clients;
declare function skipWaiting():void;