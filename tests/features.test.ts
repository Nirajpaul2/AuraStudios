import test from 'node:test';
import assert from 'node:assert/strict';
import { moodboardData, proofingGalleries, colorGradingScenes } from '../app/lib/catalog.ts';

test('catalog defines comprehensive moodboard options', () => {
  assert.ok(moodboardData.lighting.length >= 4);
  assert.ok(moodboardData.pacing.length >= 3);
  assert.ok(moodboardData.texture.length >= 3);
  assert.ok(moodboardData.focus.length >= 3);

  // Each option has an id, title, description, and tag
  for (const group of [moodboardData.lighting, moodboardData.pacing, moodboardData.texture, moodboardData.focus]) {
    for (const item of group) {
      assert.ok(item.id.length > 0);
      assert.ok(item.title.length > 0);
      assert.ok(item.desc.length > 0);
      assert.ok(item.tag.length > 0);
    }
  }
});

test('catalog defines proofing galleries with passcodes and max limit', () => {
  const codes = ['RHEA2024', 'TANYA2024', 'DEMO2025'];
  for (const code of codes) {
    const gallery = proofingGalleries[code];
    assert.ok(gallery, `Gallery ${code} must exist`);
    assert.equal(gallery.passcode, code);
    assert.ok(gallery.couple.length > 0);
    assert.ok(gallery.location.length > 0);
    assert.ok(gallery.maxAlbumSelections === 80);
    assert.ok(gallery.photos.length > 0);

    for (const photo of gallery.photos) {
      assert.ok(photo.id.length > 0);
      assert.ok(photo.title.length > 0);
      assert.ok(photo.image.startsWith('/'));
      assert.ok(photo.category.length > 0);
    }
  }
});

test('catalog defines before & after color grading scenes with technical specs', () => {
  assert.ok(colorGradingScenes.length >= 3);
  for (const scene of colorGradingScenes) {
    assert.ok(scene.id.length > 0);
    assert.ok(scene.title.length > 0);
    assert.ok(scene.image.length > 0);
    assert.ok(scene.logLabel.length > 0);
    assert.ok(scene.gradeLabel.length > 0);
    assert.ok(scene.highlights.length >= 3);
  }
});
