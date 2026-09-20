/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  RotateCcw, 
  HelpCircle, 
  Sparkles, 
  TrendingUp, 
  XCircle,
  Layers,
  Info
} from 'lucide-react';
import { InteractiveStepScaffold, InteractionPhase } from './InteractiveStepScaffold';

interface PrecursorItem {
  id: string;
  name: string;
  source: string;
  canProduceNetGlucose: boolean;
  scientificReason: string;
}

const PRECURSOR_ITEMS: PrecursorItem[] = [
  {
    id: 'laktat',
    name: 'Laktat',
    source: 'Eritrosit & otot rangka saat aktivitas anaerob',
    canProduceNetGlucose: true,
    scientificReason: 'Dioksidasi oleh Laktat Dehidrogenase (LDH) hepar menjadi piruvat, lalu masuk glukoneogenesis dalam Siklus Cori.'
  },
  {
    id: 'gliserol',
    name: 'Gliserol',
    source: 'Hidrolisis triasilgliserol di jaringan adiposa',
    canProduceNetGlucose: true,
    scientificReason: 'Difosforilasi oleh gliserol kinase menjadi gliserol-3-fosfat, lalu dioksidasi menjadi DHAP (zat antara triosa fosfat glukoneogenesis).'
  },
  {
    id: 'alanin',
    name: 'Alanin (Asam Amino)',
    source: 'Proteolisis otot rangka via Siklus Glukosa-Alanin',
    canProduceNetGlucose: true,
    scientificReason: 'Mengalami transaminasi oleh Alanin Aminotransferase (ALT) menjadi piruvat berkarbon 3, langsung memasuki jalur glukoneogenesis.'
  },
  {
    id: 'asetil_koa',
    name: 'Asetil-KoA',
    source: 'Oksidasi piruvat atau beta-oksidasi',
    canProduceNetGlucose: false,
    scientificReason: 'Reaksi Piruvat Dehidrogenase bersifat ireversibel. Dalam siklus Krebs, 2 karbon dari asetil-KoA dilepaskan sebagai 2 CO₂ sebelum mencapai oksaloasetat, sehingga tidak ada penambahan bersih atom karbon.'
  },
  {
    id: 'asam_lemak_genap',
    name: 'Asam Lemak Rantai Genap (cth: Palmitat C16)',
    source: 'Mobilisasi lipid simpanan adiposit',
    canProduceNetGlucose: false,
    scientificReason: 'Beta-oksidasi hanya menghasilkan unit asetil-KoA (2 karbon). Mamalia tidak memiliki enzim siklus glioksilat (isositrat liase dan malat sintase) untuk mengubah asetil-KoA menjadi suksinat/glukosa.'
  }
];

export const InteractiveGluconeogenesisPrecursors: React.FC = () => {
  const [phase, setPhase] = useState<InteractionPhase>('PREDICTION');
  const [placedItems, setPlacedItems] = useState<{
    CAN_PRODUCE: string[];
    CANNOT_PRODUCE: string[];
  }>({
    CAN_PRODUCE: [],
    CANNOT_PRODUCE: []
  });

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [hintIndex, setHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(100);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const hints = [
    'Tinjau stoikiometri atom karbon dalam siklus asam sitrat (TCA): Apakah ada pelepasan CO₂ yang setara dengan atom karbon yang masuk?',
    'Asam amino glukogenik, laktat, dan gliserol dapat menghasilkan pertambahan bersih molekul oksaloasetat atau triosa fosfat.',
    'Asetil-KoA dan asam lemak rantai genap tidak dapat menghasilkan glukosa netto pada mamalia karena reaksi PDH ireversibel dan ketiadaan pirau glioksilat.'
  ];

  const placeItem = (id: string, targetBucket: 'CAN_PRODUCE' | 'CANNOT_PRODUCE') => {
    setPlacedItems(prev => {
      const otherBucket = targetBucket === 'CAN_PRODUCE' ? 'CANNOT_PRODUCE' : 'CAN_PRODUCE';
      return {
        ...prev,
        [otherBucket]: prev[otherBucket].filter(i => i !== id),
        [targetBucket]: Array.from(new Set([...prev[targetBucket], id]))
      };
    });
    setSelectedItemId(null);
    setPhase('MANIPULATION');
  };

  const handleCheck = () => {
    setIsAnswerChecked(true);
    setPhase('FEEDBACK');

    const canProduceCorrect = placedItems.CAN_PRODUCE.every(id => {
      const item = PRECURSOR_ITEMS.find(p => p.id === id);
      return item?.canProduceNetGlucose === true;
    }) && placedItems.CAN_PRODUCE.length === 3;

    const cannotProduceCorrect = placedItems.CANNOT_PRODUCE.every(id => {
      const item = PRECURSOR_ITEMS.find(p => p.id === id);
      return item?.canProduceNetGlucose === false;
    }) && placedItems.CANNOT_PRODUCE.length === 2;

    const correct = canProduceCorrect && cannotProduceCorrect;
    setIsCorrect(correct);
    if (!correct) {
      setScore(prev => Math.max(30, prev - 20));
    }
  };

  const handleReset = () => {
    setPlacedItems({ CAN_PRODUCE: [], CANNOT_PRODUCE: [] });
    setSelectedItemId(null);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setPhase('MANIPULATION');
  };

  const unplacedList = PRECURSOR_ITEMS.filter(
    p => !placedItems.CAN_PRODUCE.includes(p.id) && !placedItems.CANNOT_PRODUCE.includes(p.id)
  );

  return (
    <div className="space-y-4">
      <InteractiveStepScaffold
        currentPhase={phase}
        title="Aktivitas Interaktif 9: Klasifikasi Prekursor Glukoneogenesis (Glukogenik Netto vs Non-Glukogenik)"
        instruction="Kelompokkan 5 substrat fisiologis ke dalam wadah 'Dapat Menghasilkan Glukosa Bersih' atau 'Tidak Dapat Menghasilkan Glukosa Bersih'. Amati alasan stoikiometri karbon dan keberadaan enzim spesifik."
        hints={hints}
        currentHintIndex={hintIndex}
        onShowNextHint={() => {
          setHintIndex(prev => Math.min(hints.length, prev + 1));
          setScore(prev => Math.max(30, prev - 10));
        }}
        onCheckAnswer={handleCheck}
        onReset={handleReset}
        onShowExplanation={() => {}}
        isAnswerChecked={isAnswerChecked}
        isCorrect={isCorrect}
        score={score}
        maxScore={100}
        canCheck={placedItems.CAN_PRODUCE.length + placedItems.CANNOT_PRODUCE.length === 5}
        explanation="Untuk menghasilkan sintesis netto glukosa, suatu substrat harus mampu menambah jumlah bersih zat antara 4-karbon (seperti oksaloasetat atau piruvat) tanpa kehilangan seluruh atom karbonnya sebelum mencapai tahap tersebut. Laktat, gliserol, dan asam amino glukogenik (seperti alanin) memenuhi syarat ini. Sebaliknya, Asetil-KoA dan asam lemak rantai genap tidak dapat menghasilkan sintesis glukosa netto pada manusia: enzim piruvat dehidrogenase (PDH) bersifat ireversibel, dan ketika asetil-KoA (2C) masuk ke siklus Krebs, 2 atom karbon dilepaskan tuntas sebagai 2 molekul CO₂ sebelum oksaloasetat diregenerasi (keuntungan bersih karbon = 0). Hanya tumbuhan dan mikroorganisme yang memiliki jalur glioksilat yang dapat mengubah lipid menjadi glukosa."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Kolom Daftar Prekursor */}
        <div className="lg:col-span-4 bg-white border border-[#E5E2D9] rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-900">
              Substrat Fisiologis ({unplacedList.length} Belum Ditempatkan)
            </span>
          </div>

          <div className="space-y-2">
            {unplacedList.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-400 border border-dashed border-stone-200 rounded-xl">
                Semua substrat telah dikelompokkan! Tekan <strong>Periksa Jawaban</strong> di atas.
              </div>
            ) : (
              unplacedList.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemId(selectedItemId === item.id ? null : item.id)}
                  className={`p-3 rounded-xl border text-xs transition-all cursor-pointer select-none ${
                    selectedItemId === item.id
                      ? 'bg-amber-100 border-amber-500 text-amber-950 ring-2 ring-amber-400 scale-[1.02]'
                      : 'bg-[#FAF8F5] hover:bg-amber-50 border-stone-200 text-stone-800'
                  }`}
                >
                  <div className="font-bold text-stone-900">{item.name}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5">{item.source}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kolom Dua Wadah Klasifikasi */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Wadah 1: DAPAT MENGHASILKAN GLUKOSA BERSIH */}
          <div
            onClick={() => {
              if (selectedItemId) {
                placeItem(selectedItemId, 'CAN_PRODUCE');
              }
            }}
            className={`border-2 rounded-2xl p-4 flex flex-col justify-between transition-all min-h-[280px] ${
              selectedItemId
                ? 'border-emerald-400 bg-emerald-50/40 ring-2 ring-emerald-300/40 cursor-pointer'
                : 'border-emerald-200 bg-emerald-50/20'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Dapat Menghasilkan Glukosa Netto (3 Substrat)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  {placedItems.CAN_PRODUCE.length}/3
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                {placedItems.CAN_PRODUCE.map(id => {
                  const item = PRECURSOR_ITEMS.find(p => p.id === id)!;
                  const isChecked = isAnswerChecked;
                  const isItemRight = item.canProduceNetGlucose === true;

                  return (
                    <div
                      key={id}
                      className={`p-2.5 rounded-xl text-xs border transition-all ${
                        isChecked
                          ? isItemRight
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                            : 'bg-red-100 border-red-400 text-red-950'
                          : 'bg-white border-emerald-200 text-stone-800'
                      }`}
                    >
                      <div className="font-bold">{item.name}</div>
                      {isChecked && (
                        <div className="text-[10px] text-stone-600 mt-1">{item.scientificReason}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedItemId && (
              <div className="p-2 bg-emerald-100 text-emerald-900 rounded-xl text-[11px] font-bold text-center border border-emerald-300 animate-pulse">
                Ketuk di sini untuk memasukkan ke Glukogenik Netto
              </div>
            )}
          </div>

          {/* Wadah 2: TIDAK DAPAT MENGHASILKAN GLUKOSA BERSIH */}
          <div
            onClick={() => {
              if (selectedItemId) {
                placeItem(selectedItemId, 'CANNOT_PRODUCE');
              }
            }}
            className={`border-2 rounded-2xl p-4 flex flex-col justify-between transition-all min-h-[280px] ${
              selectedItemId
                ? 'border-red-400 bg-red-50/40 ring-2 ring-red-300/40 cursor-pointer'
                : 'border-red-200 bg-red-50/20'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-red-200 pb-2">
                <span className="text-xs font-bold text-red-950 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-600" />
                  Tidak Dapat Menghasilkan Glukosa Netto (2 Substrat)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-bold">
                  {placedItems.CANNOT_PRODUCE.length}/2
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                {placedItems.CANNOT_PRODUCE.map(id => {
                  const item = PRECURSOR_ITEMS.find(p => p.id === id)!;
                  const isChecked = isAnswerChecked;
                  const isItemRight = item.canProduceNetGlucose === false;

                  return (
                    <div
                      key={id}
                      className={`p-2.5 rounded-xl text-xs border transition-all ${
                        isChecked
                          ? isItemRight
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                            : 'bg-red-100 border-red-400 text-red-950'
                          : 'bg-white border-red-200 text-stone-800'
                      }`}
                    >
                      <div className="font-bold">{item.name}</div>
                      {isChecked && (
                        <div className="text-[10px] text-stone-600 mt-1">{item.scientificReason}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedItemId && (
              <div className="p-2 bg-red-100 text-red-900 rounded-xl text-[11px] font-bold text-center border border-red-300 animate-pulse">
                Ketuk di sini untuk memasukkan ke Non-Glukogenik
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
