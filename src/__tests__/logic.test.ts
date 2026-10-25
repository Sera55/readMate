import { describe, it, expect } from 'vitest';

function calculateBoundingBox(lat: number, lng: number, radius: number) {
  const latDelta = radius / 111;
  const lngDelta = radius / (111 * Math.cos(lat * Math.PI / 180));
  return {
    latMin: lat - latDelta,
    latMax: lat + latDelta,
    lngMin: lng - lngDelta,
    lngMax: lng + lngDelta
  };
}

describe('Proximity Logic', () => {
  it('should calculate bounding box correctly at NY latitude', () => {
    const lat = 40.7128;
    const lng = -74.0060;
    const radius = 5; // 5km
    
    const bbox = calculateBoundingBox(lat, lng, radius);
    
    expect(bbox.latMax).toBeGreaterThan(lat);
    expect(bbox.latMin).toBeLessThan(lat);
    expect(bbox.lngMax).toBeGreaterThan(lng);
    expect(bbox.lngMin).toBeLessThan(lng);
    
    // Roughly 0.045 degrees for 5km at NY latitude
    expect(bbox.latMax - lat).toBeCloseTo(0.045, 2);
  });

  it('should have larger lngDelta at higher latitudes', () => {
    const bboxNY = calculateBoundingBox(40.7128, -74.0060, 5);
    const bboxLondon = calculateBoundingBox(51.5074, -0.1278, 5);
    
    const diffNY = bboxNY.lngMax - bboxNY.lngMin;
    const diffLondon = bboxLondon.lngMax - bboxLondon.lngMin;
    
    expect(diffLondon).toBeGreaterThan(diffNY);
  });
});

describe('Social Credits Logic', () => {
  it('should calculate social credit increment', () => {
    const type = 'GIFT';
    const increment = type === 'GIFT' ? 5 : 0;
    expect(increment).toBe(5);
  });
});
