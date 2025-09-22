/**
 * TODO: Update this component to use your client-side framework's link
 * component. We've provided examples of how to do this for Next.js, Remix, and
 * Inertia.js in the Catalyst documentation:
 *
 * https://catalyst.tailwindui.com/docs#client-side-router-integration
 */

import * as Headless from '@headlessui/react'
import React, { forwardRef } from 'react'

export const Link = forwardRef(function Link(
  { target, rel, ...props }: { href: string } & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  let finalTarget = target ?? '_blank'
  let finalRel = rel ?? 'noopener noreferrer'

  return (
    <Headless.DataInteractive>
      <a {...props} target={finalTarget} rel={finalRel} ref={ref} />
    </Headless.DataInteractive>
  )
})
