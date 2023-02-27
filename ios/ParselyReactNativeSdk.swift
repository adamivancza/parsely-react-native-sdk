import ParselyAnalytics

@objc(ParselyReactNativeSdk)
class ParselyReactNativeSdk: NSObject {

    @objc func configure(_ siteId: String) -> Void {
        Parsely.sharedInstance.configure(siteId: siteId)
    }
    
    @objc func trackPageView(_ url: String, urlref: String, extraData: Dictionary<String, Any>, siteId: String, canonical_url: String, pub_date: String, title: String, authors: Array<String>, image_url: String, section: String, tags: Array<String>) -> Void {
        let dateFormatter = ISO8601DateFormatter()
        dateFormatter.formatOptions = [
            .withFullDate,
            .withFullTime,
            .withDashSeparatorInDate,
            .withFractionalSeconds]
        let date = dateFormatter.date(from: pub_date)
        let metadata = ParselyMetadata(canonical_url: canonical_url, pub_date: date, title: title, authors: authors, image_url: image_url, section: section, tags: tags)
        Parsely.sharedInstance.trackPageView(url: url, urlref: urlref, metadata: metadata, extraData: extraData, siteId: siteId)
    }

    @objc func startEngagement(_ url: String, urlref: String, extraData: Dictionary<String, Any>, siteId: String) -> Void {
        Parsely.sharedInstance.startEngagement(url: url, urlref: urlref, extraData: extraData, siteId: siteId)
    }

    @objc func stopEngagement() -> Void {
        Parsely.sharedInstance.stopEngagement()
    }
}
