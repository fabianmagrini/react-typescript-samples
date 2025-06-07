export class SingletonService {
  private static instance: SingletonService;
  private channel: BroadcastChannel;
  private isPrimary: boolean = false;

  private constructor() {
    this.channel = new BroadcastChannel('app-instance');
    this.setupChannel();
  }

  public static getInstance(): SingletonService {
    if (!SingletonService.instance) {
      SingletonService.instance = new SingletonService();
    }
    return SingletonService.instance;
  }

  private setupChannel() {
    this.channel.onmessage = (event) => {
      if (event.data === 'check-primary') {
        this.channel.postMessage('primary-exists');
      }
    };

    // Check if another instance exists
    this.channel.postMessage('check-primary');
    
    // Set a timeout to check if we're the primary instance
    setTimeout(() => {
      this.isPrimary = true;
    }, 100);
  }

  public isPrimaryInstance(): boolean {
    return this.isPrimary;
  }

  public cleanup() {
    this.channel.close();
  }
} 