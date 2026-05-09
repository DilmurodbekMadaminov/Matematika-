import React from 'react';

interface MathTextProps {
  text: string;
}

export const MathText: React.FC<MathTextProps> = ({ text }) => {
  // Convert standard math notations to nicely formatted HTML
  const formatMath = (str: string) => {
    let html = str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/-&gt;/g, '→')
      // limits
      .replace(/lim\(([^)]+)\)/g, '<span class="inline-flex flex-col align-middle text-center mx-1 mb-1"><span class="leading-none italic font-serif">lim</span><span class="text-[0.65em] leading-none mt-0.5">$1</span></span>')
      // definite integrals
      .replace(/∫\[([^,]+),\s*([^\]]+)\]/g, '<span class="inline-flex flex-col align-middle text-center mx-1 w-5"><span class="text-[0.60em] leading-none translate-y-1 block text-left ml-2">$2</span><span class="text-2xl leading-none">∫</span><span class="text-[0.60em] leading-none -translate-y-1 block text-right mr-2">$1</span></span>')
      // indefinite integrals
      .replace(/∫/g, '<span class="text-2xl align-middle italic mx-0.5">∫</span>')
      // summations
      .replace(/∑/g, '<span class="text-2xl align-middle mx-0.5">∑</span>')
      // Superscripts with brackets
      .replace(/\^\(([^)]+)\)/g, '<sup class="text-[0.70em]">$1</sup>')
      // Superscripts without brackets
      .replace(/\^([a-zA-Z0-9+\-]+)/g, '<sup class="text-[0.70em]">$1</sup>')
      // Subscripts with curly braces
      .replace(/_\{([^}]+)\}/g, '<sub class="text-[0.70em]">$1</sub>')
      // Subscripts with round brackets
      .replace(/_\(([^)]+)\)/g, '<sub class="text-[0.70em]">$1</sub>')
      // Subscripts without brackets
      .replace(/_([a-zA-Z0-9]+)/g, '<sub class="text-[0.70em]">$1</sub>')
      // Roots with brackets
      .replace(/√\(([^)]+)\)/g, '<span class="whitespace-nowrap inline-flex items-center"><span class="text-lg leading-none">&radic;</span><span class="border-t-[1.5px] border-current pt-[0.1em] pr-[1px] leading-tight">$1</span></span>')
      // Roots without brackets
      .replace(/√([a-zA-Z0-9.]+)/g, '<span class="whitespace-nowrap inline-flex items-center"><span class="text-lg leading-none">&radic;</span><span class="border-t-[1.5px] border-current pt-[0.1em] pr-[1px] leading-tight">$1</span></span>')
      // infinity
      .replace(/∞/g, '<span class="text-lg align-middle">∞</span>');
      
    return html;
  };

  return (
    <span 
      dangerouslySetInnerHTML={{ __html: formatMath(text) }} 
      className="font-medium inline-block break-words items-center" 
    />
  );
};
