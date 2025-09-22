import clsx from 'clsx'

type HeadingProps = { level?: 1 | 2 | 3 | 4 | 5 | 6 } & React.ComponentPropsWithoutRef<
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>

export function Heading({ className, level = 1, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={clsx(className, 'text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white')}
    />
  )
}

export function Subheading({ className, level = 2, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`

  let preset = 'text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white'

  if (level === 2) {
    preset = clsx(
      preset,
      'prose-heading prose-heading-lg'
    )
  } else if (level === 3) {
    preset = clsx(
      preset,
      'prose-heading prose-heading-step'
    )
  }

  return <Element {...props} className={clsx(preset, className)} />
}
