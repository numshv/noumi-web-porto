"use client"

import { autoUpdate, flip, offset, shift, useFloating, useHover, useInteractions } from '@floating-ui/react';
import React, { useState } from 'react'

interface WikiLinkProps{
    text: string;
    href: string;
    preview: {
        title: string;
        description: string;
    };
}

export default function WikiLink({text, href, preview}: WikiLinkProps) {

  const [isOpen, setIsOpen] = useState(false);

  const {refs, floatingStyles, context} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(8), flip(), shift({padding: 8})],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {delay: {open: 300, close: 100}});
  const {getReferenceProps, getFloatingProps} = useInteractions([hover]);

  return (
    <>
        <a
        ref={refs.setReference}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='underline underline-offset-2 decoration-foreground/40 hover:decoration-foreground transition-all duration-200'
        {...getReferenceProps()}
        >
            {text}
        </a>

        {isOpen && (
            <div
                ref={refs.setFloating}
                style={floatingStyles}
                className='z-50 w-72 bg-background border border-foreground/10 shadow-lg rounded-sm overflow-hidden'
                {...getFloatingProps()}
            >

                <div className='p-3 flex flex-col gap-1'>
                    <p className='font-sans font-semibold text-xs tracking-wide'>
                        {preview.title}
                    </p>
                    <p className='text-sm leading-relaxed'>
                        {preview.description}
                    </p>

                    <a
                        href={href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='font-sans text-xs text-foreground/40 hover:text-foreground transition-colors mt-1'
                    >
                        Read More
                    </a>
                </div>

            </div>
        )}
    </>
  )
}
