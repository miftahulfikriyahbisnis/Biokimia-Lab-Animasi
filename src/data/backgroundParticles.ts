/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BgParticle {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  dx: string;
  dy: string;
  opacity: number;
}

// 12 partikel cahaya lembut & tenang (maksimal 10–15 partikel sesuai instruksi)
export const BACKGROUND_PARTICLES: BgParticle[] = [
  { id: 1, left: '14%', top: '72%', size: 3, delay: '0s', duration: '24s', dx: '18px', dy: '-55px', opacity: 0.28 },
  { id: 2, left: '26%', top: '84%', size: 4, delay: '3.5s', duration: '28s', dx: '-16px', dy: '-75px', opacity: 0.32 },
  { id: 3, left: '38%', top: '60%', size: 2.5, delay: '7s', duration: '22s', dx: '12px', dy: '-50px', opacity: 0.22 },
  { id: 4, left: '52%', top: '88%', size: 4.5, delay: '1.2s', duration: '30s', dx: '-14px', dy: '-80px', opacity: 0.30 },
  { id: 5, left: '68%', top: '68%', size: 3, delay: '5s', duration: '25s', dx: '15px', dy: '-60px', opacity: 0.26 },
  { id: 6, left: '84%', top: '80%', size: 3.5, delay: '9s', duration: '27s', dx: '-18px', dy: '-70px', opacity: 0.28 },
  { id: 7, left: '18%', top: '38%', size: 2.5, delay: '4s', duration: '23s', dx: '14px', dy: '-45px', opacity: 0.20 },
  { id: 8, left: '46%', top: '30%', size: 4, delay: '8.5s', duration: '29s', dx: '-12px', dy: '-65px', opacity: 0.28 },
  { id: 9, left: '74%', top: '35%', size: 3, delay: '2.5s', duration: '26s', dx: '16px', dy: '-55px', opacity: 0.25 },
  { id: 10, left: '88%', top: '25%', size: 2.5, delay: '6s', duration: '21s', dx: '-15px', dy: '-40px', opacity: 0.20 },
  { id: 11, left: '32%', top: '22%', size: 3.5, delay: '11s', duration: '31s', dx: '10px', dy: '-60px', opacity: 0.26 },
  { id: 12, left: '62%', top: '18%', size: 3, delay: '13s', duration: '27s', dx: '-14px', dy: '-50px', opacity: 0.24 },
];
