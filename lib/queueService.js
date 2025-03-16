// Queue for handling Supabase operations
class QueueService {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.retryAttempts = 3;
    this.retryDelay = 2000; // 2 seconds
  }

  async addToQueue(operation) {
    this.queue.push(operation);
    if (!this.isProcessing) {
      await this.processQueue();
    }
  }

  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const operation = this.queue[0];
      let attempts = 0;
      let success = false;

      while (attempts < this.retryAttempts && !success) {
        try {
          await operation();
          success = true;
        } catch (error) {
          attempts++;
          if (attempts === this.retryAttempts) {
            console.error('Operation failed after max retries:', error);
            // Could implement error reporting service here
          } else {
            await new Promise(resolve => setTimeout(resolve, this.retryDelay));
          }
        }
      }

      this.queue.shift(); // Remove the operation from queue
    }

    this.isProcessing = false;
  }
}

export const queueService = new QueueService();
