// Notifier.ts
import INotifier from "./Interface";

class Notifier implements INotifier {
    send(message: string): void {
        console.log(`Sending message: ${message}`);
    }
}

export default Notifier;