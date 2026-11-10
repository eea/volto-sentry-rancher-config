import { isNoiseEvent } from './index';

const eventWithFrame = (filename) => ({
  exception: { values: [{ stacktrace: { frames: [{ filename }] } }] },
  tags: { server_name: 'www.eea.europa.eu' },
});

describe('isNoiseEvent', () => {
  it('drops events raised inside browser extensions', () => {
    expect(
      isNoiseEvent(eventWithFrame('chrome-extension://abc/inject.js')),
    ).toBe(true);
    expect(
      isNoiseEvent(eventWithFrame('webkit-masked-url://hidden/ext.js')),
    ).toBe(true);
    expect(
      isNoiseEvent(eventWithFrame('safari-web-extension://abc/app.js')),
    ).toBe(true);
  });

  it('drops events coming from Google Translate', () => {
    expect(
      isNoiseEvent({
        ...eventWithFrame('/static/js/client.js'),
        tags: { server_name: 'www-eea-europa-eu.translate.goog' },
      }),
    ).toBe(true);
  });

  it('keeps events from our own bundles', () => {
    expect(isNoiseEvent(eventWithFrame('/static/js/client.db70883b.js'))).toBe(
      false,
    );
    expect(isNoiseEvent({})).toBe(false);
  });
});
