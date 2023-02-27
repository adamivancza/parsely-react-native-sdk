#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ParselyReactNativeSdk, NSObject)

RCT_EXTERN_METHOD(configure:(NSString *)siteId)

RCT_EXTERN_METHOD(trackPageView: (NSString *)url urlref:(NSString *)urlref extraData:(NSDictionary *)extraData siteId:(NSString *)siteId canonical_url:(NSString *)canonical_url pub_date:(NSString *)pub_date title:(NSString *)title authors:(NSArray *)authors image_url:(NSString *)image_url section:(NSString *)section tags:(NSArray *)tags)

RCT_EXTERN_METHOD(startEngagement:(NSString *)url urlref:(NSString *)urlref extraData:(NSDictionary *)extraData siteId:(NSString *)siteId)

RCT_EXTERN_METHOD(stopEngagement)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
