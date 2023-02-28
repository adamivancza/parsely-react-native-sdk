package com.parselyreactnativesdk;

import androidx.annotation.NonNull;
import android.text.TextUtils;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Map;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Calendar;
import java.util.GregorianCalendar;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;

import com.parsely.parselyandroid.*;

@ReactModule(name = ParselyReactNativeSdkModule.NAME)
public class ParselyReactNativeSdkModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
  public static final String NAME = "ParselyReactNativeSdk";

  public ParselyReactNativeSdkModule(ReactApplicationContext reactContext) {
    super(reactContext);

    reactContext.addLifecycleEventListener(this);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @Override
  public void onHostResume() {
    // Activity `onResume` - not needed
  }

  @Override
  public void onHostPause() {
    // Activity `onPause` - not needed
  }

  @Override
  public void onHostDestroy() {
    ParselyTracker.sharedInstance().flushEventQueue();
  }

  @ReactMethod
  public void configure(String siteId) {
    ParselyTracker.sharedInstance(siteId, this.getReactApplicationContext());
  }

  @ReactMethod
  public void trackPageView(String url, String urlRef, ReadableMap extraData, String siteId, String canonicalUrl,
      String publicationDate, String title, ReadableArray authors, String imageUrl, String section,
      ReadableArray tags) {
    if (!TextUtils.isEmpty(siteId)) {
      this.configure(siteId);
    }

    ParselyMetadata metaData = new ParselyMetadata(readableArrayToStringArrayList(authors), canonicalUrl, section,
        readableArrayToStringArrayList(tags), imageUrl, title, stringToCalendar(publicationDate));
    Map<String, Object> extraDataMap = extraData == null ? null : extraData.toHashMap();
    ParselyTracker.sharedInstance().trackPageview(url, urlRef, metaData, extraDataMap);
  }

  @ReactMethod
  public void startEngagement(String url, String urlRef, ReadableMap extraData, String siteId) {
    if (!TextUtils.isEmpty(siteId)) {
      this.configure(siteId);
    }
    ParselyTracker.sharedInstance().startEngagement(url, urlRef);
  }

  @ReactMethod
  public void stopEngagement() {
    ParselyTracker.sharedInstance().stopEngagement();
  }

  private ArrayList<String> readableArrayToStringArrayList(ReadableArray readableArray) {
    if (readableArray == null) {
      return null;
    }
    ArrayList<String> arr = new ArrayList<String>();
    for (int i = 0; i < readableArray.size(); i++) {
      arr.add(readableArray.getString(i));
    }

    return arr;
  }

  private Calendar stringToCalendar(String isoString) {
    if (TextUtils.isEmpty(isoString)) {
      return null;
    }
    Instant instant = Instant.parse(isoString);
    ZonedDateTime zonedDateTime = ZonedDateTime.ofInstant(instant, ZoneId.systemDefault());
    return GregorianCalendar.from(zonedDateTime);
  }
}
