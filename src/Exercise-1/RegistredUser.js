class RegistredUser {
  constructor(services = []) {
    this.services = services
  }

  getTotalImproved = () => 
    this.services.reduce(total, service => {
      const multimediaContent = service.getMultimediaContent();
      
      if (typeof multimediaContent == PremiumContent) {
        total += multimediaContent.additionalFee;
      }

      switch (typeof service) {
        case StreamingService:
          total += multimediaContent.streamingPrice;
        case DownloadService:
        default: // Taking account that can not exists another service type.
          total += multimediaContent.downloadPrice;
      }

      return total;
    }, 0)

  getTotal () {
    let total = 0;

    this.services.forEach(service, index => {
      let multimediaContent = service.getMultimediaContent();

      if (typeof service == StreamingService) {
        total += multimediaContent.streamingPrice;
      } else if (typeof service == DownloadService) {
        total += multimediaContent.downloadPrice;
      }

      if (typeof multimediaContent == PremiumContent) {
        total += multimediaContent.additionalFee;
      }
    });

    return total;
  }
}