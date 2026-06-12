"use client";

interface Props {
  tier: number;
  enchantment: number;
  quality: number;

  onTierChange: (v: number) => void;
  onEnchantmentChange: (v: number) => void;
  onQualityChange: (v: number) => void;
}

export default function VariantSelector({
  tier,
  enchantment,
  quality,
  onTierChange,
  onEnchantmentChange,
  onQualityChange,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">

      <select
        value={tier}
        onChange={(e) =>
          onTierChange(Number(e.target.value))
        }
        className="rounded bg-slate-800 p-2"
      >
        {[4,5,6,7,8].map((t)=>(
          <option key={t} value={t}>
            T{t}
          </option>
        ))}
      </select>

      <select
        value={enchantment}
        onChange={(e)=>
          onEnchantmentChange(
            Number(e.target.value)
          )
        }
        className="rounded bg-slate-800 p-2"
      >
        {[0,1,2,3,4].map((e)=>(
          <option key={e} value={e}>
            +{e}
          </option>
        ))}
      </select>

      <select
        value={quality}
        onChange={(e)=>
          onQualityChange(
            Number(e.target.value)
          )
        }
        className="rounded bg-slate-800 p-2"
      >
        <option value={1}>Normal</option>
        <option value={2}>Good</option>
        <option value={3}>Outstanding</option>
        <option value={4}>Excellent</option>
        <option value={5}>Masterpiece</option>
      </select>

    </div>
  );
}