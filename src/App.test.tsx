import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AppRoutes } from './app/AppRouter'
import { contactWhatsapp, tourSignup, tourSignupHref } from './data/site'

describe('navegación inicial', () => {
  it('muestra la página de inicio', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', {
        name: /soluciones para el agro relaciones que generan oportunidades/i,
      }),
    ).toBeInTheDocument()
  })

  it('muestra los aliados confirmados en la sección Alianzas del inicio', () => {
    cleanup()
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('img', { name: 'AKO Agro Laboratorio' })).toHaveAttribute('src', '/images/ako-logo.svg')
    expect(screen.getByRole('img', { name: 'LM Seguros' })).toHaveAttribute('src', '/images/lm-seguros-logo.png')
    expect(screen.getByRole('link', { name: /conocé \+labs/i })).toHaveAttribute('href', '/labs')
    expect(screen.getByRole('link', { name: /conocé \+protect/i })).toHaveAttribute('href', '/protect')
    expect(screen.queryByText(/contenido en construcción/i)).not.toBeInTheDocument()
  })

  it('despliega y cierra los submenús de Nosotros y Unidades', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    const aboutToggle = document.querySelector('[aria-controls="menu-nosotros"]') as HTMLElement
    const unitsToggle = document.querySelector('[aria-controls="menu-unidades"]') as HTMLElement

    expect(aboutToggle).toHaveAttribute('aria-expanded', 'false')
    expect(unitsToggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(unitsToggle)
    expect(unitsToggle).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(aboutToggle)
    expect(aboutToggle).toHaveAttribute('aria-expanded', 'true')
    expect(unitsToggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(aboutToggle)
    expect(aboutToggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('muestra una página no encontrada para una ruta inexistente', () => {
    render(
      <MemoryRouter initialEntries={['/ruta-inexistente']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /página no encontrada/i })).toBeInTheDocument()
  })

  it('permite explorar las soluciones de +LABS', () => {
    render(
      <MemoryRouter initialEntries={['/labs']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /nutrición y aplicación con asesoramiento técnico/i,
      }),
    ).toBeInTheDocument()

    const applicationToggle = screen.getByRole('button', { name: /aplicación.*coadyuvantes/i })
    const waterToggle = screen.getByRole('button', { name: /agua.*el agua también define el resultado/i })

    expect(applicationToggle).toHaveAttribute('aria-expanded', 'true')
    expect(waterToggle).toHaveAttribute('aria-expanded', 'false')

    const waterPanel = document.getElementById(waterToggle.getAttribute('aria-controls') ?? '')
    expect(waterPanel).not.toBeVisible()

    fireEvent.click(waterToggle)

    expect(waterToggle).toHaveAttribute('aria-expanded', 'true')
    expect(applicationToggle).toHaveAttribute('aria-expanded', 'false')
    expect(waterPanel).toBeVisible()
    expect(waterPanel).toHaveTextContent(/calidad y sus condiciones/i)
    expect(document.getElementById(applicationToggle.getAttribute('aria-controls') ?? '')).not.toBeVisible()
    expect(screen.queryByRole('tab')).not.toBeInTheDocument()
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' })
  })

  it('permite recorrer las coberturas de +PROTECT', () => {
    render(
      <MemoryRouter initialEntries={['/protect']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { level: 1, name: /protección para cada actividad/i }),
    ).toBeInTheDocument()

    const cropsToggle = screen.getByRole('button', { name: /01.*cultivos/i })
    const livestockToggle = screen.getByRole('button', { name: /06.*ganado y equinos/i })

    expect(cropsToggle).toHaveAttribute('aria-expanded', 'true')
    expect(livestockToggle).toHaveAttribute('aria-expanded', 'false')

    const livestockPanel = document.getElementById(livestockToggle.getAttribute('aria-controls') ?? '')
    expect(livestockPanel).not.toBeVisible()

    fireEvent.click(livestockToggle)

    expect(livestockToggle).toHaveAttribute('aria-expanded', 'true')
    expect(cropsToggle).toHaveAttribute('aria-expanded', 'false')
    expect(livestockPanel).toBeVisible()
    expect(livestockPanel).toHaveTextContent(/hacienda: incendios/i)
  })

  it('permite recorrer el diagnóstico de +CLEAN', () => {
    render(
      <MemoryRouter initialEntries={['/clean']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { level: 1, name: /higiene que responde a cada proceso/i }),
    ).toBeInTheDocument()

    const water = screen.getByRole('button', { name: /calidad del agua/i })
    const fats = screen.getByRole('button', { name: /grasas/i })

    expect(water).toHaveAttribute('aria-pressed', 'true')
    expect(fats).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(fats)

    expect(fats).toHaveAttribute('aria-pressed', 'true')
    expect(water).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('slider', { name: /comparar antes y después/i })).toBeInTheDocument()
  })

  it('permite recorrer lo que genera +EVENTS', () => {
    render(
      <MemoryRouter initialEntries={['/events']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { level: 1, name: /encuentros que fortalecen relaciones/i }),
    ).toBeInTheDocument()

    const bonds = screen.getByRole('button', { name: /01.*vínculos/i })
    const community = screen.getByRole('button', { name: /04.*comunidad/i })

    expect(bonds).toHaveAttribute('aria-expanded', 'true')
    expect(community).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(community)

    expect(community).toHaveAttribute('aria-expanded', 'true')
    expect(bonds).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('link', { name: /hablemos de tu evento/i })).toHaveAttribute('href', '/contacto')
  })

  it('permite recorrer los criterios de +FARMS', () => {
    render(
      <MemoryRouter initialEntries={['/farms']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { level: 1, name: /operaciones de campo bien acompañadas/i }),
    ).toBeInTheDocument()

    const location = screen.getByRole('button', { name: /01.*ubicación/i })
    const aptitude = screen.getByRole('button', { name: /05.*aptitud productiva/i })

    expect(location).toHaveAttribute('aria-expanded', 'true')
    expect(aptitude).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(aptitude)

    expect(aptitude).toHaveAttribute('aria-expanded', 'true')
    expect(location).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText(/alianza con conte/i)).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contactar a \+farms/i })).toHaveAttribute('href', '/contacto')
  })

  it('muestra la página de Agro Polo Tour', () => {
    render(
      <MemoryRouter initialEntries={['/agro-polo-tour']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1, name: /todo empezó en movimiento/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /una historia que no se quedó quieta/i })).toBeInTheDocument()
    ;['Nace', 'Crece', 'Continúa'].forEach((step) => {
      expect(screen.getByRole('heading', { level: 3, name: step })).toBeInTheDocument()
    })
    expect(screen.getByRole('link', { name: /seguí la historia/i })).toHaveAttribute('href', '#historia')
    expect(screen.getByRole('link', { name: /seguí @agropolotour/i })).toHaveAttribute('href', 'https://www.instagram.com/agropolotour/')
    expect(screen.getByRole('link', { name: /anotate a la edición 2027/i })).toHaveAttribute('href', tourSignupHref())

    fireEvent.click(screen.getByRole('button', { name: /foto siguiente/i }))
    expect(screen.getByAltText(/invitados reunidos de noche/i)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /foto anterior/i }))
    fireEvent.click(screen.getByRole('button', { name: /foto anterior/i }))
    expect(screen.getByAltText(/un jugador sonriente acomoda su casco/i)).toBeInTheDocument()
  })
})

describe('inscripción al Agro Polo Tour', () => {
  it('arma el link de WhatsApp de la empresa con el mensaje precargado', () => {
    expect(tourSignupHref()).toBe(
      'https://wa.me/5493515721881?text=Hola%2C%20quiero%20anotarme%20a%20la%20edici%C3%B3n%202027%20del%20Agro%20Polo%20Tour',
    )
  })

  it('lleva a Contacto si no hay número cargado', () => {
    const number = tourSignup.whatsapp
    tourSignup.whatsapp = ''
    try {
      const { container } = render(
        <MemoryRouter initialEntries={['/agro-polo-tour']}>
          <AppRoutes />
        </MemoryRouter>,
      )
      expect(within(container).getByRole('link', { name: /anotate a la edición 2027/i })).toHaveAttribute('href', '/contacto')
    } finally {
      tourSignup.whatsapp = number
    }
  })
})

describe('botón flotante de WhatsApp', () => {
  it('abre el chat de la empresa con el mensaje precargado en todas las páginas', () => {
    ;['/', '/labs', '/agro-polo-tour', '/contacto'].forEach((path) => {
      const { container, unmount } = render(
        <MemoryRouter initialEntries={[path]}>
          <AppRoutes />
        </MemoryRouter>,
      )
      const button = container.querySelector('a.whatsapp-button')
      expect(button).toHaveAttribute(
        'href',
        'https://wa.me/5493515721881?text=Hola%2C%20quiero%20hacer%20una%20consulta%20sobre%20Grupo%20Agro%20Polo',
      )
      expect(button).toHaveAttribute('target', '_blank')
      unmount()
    })
  })

  it('no se muestra si no hay número cargado', () => {
    const number = contactWhatsapp.number
    contactWhatsapp.number = ''
    try {
      const { container } = render(
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>,
      )
      expect(container.querySelector('.whatsapp-button')).not.toBeInTheDocument()
      expect(within(container).queryByText(/próximamente/i)).not.toBeInTheDocument()
    } finally {
      contactWhatsapp.number = number
    }
  })
})

describe('página de Contacto', () => {
  // Los ids del formulario se repetirían entre renders si no se limpia la página anterior
  afterEach(cleanup)

  function renderContact() {
    return render(
      <MemoryRouter initialEntries={['/contacto']}>
        <AppRoutes />
      </MemoryRouter>,
    )
  }

  it('muestra WhatsApp, teléfono, correo e Instagram como canales', () => {
    const { container } = renderContact()
    const main = within(container.querySelector('main') as HTMLElement)
    expect(main.getByRole('heading', { level: 1, name: /buscás una solución\? conversemos/i })).toBeInTheDocument()
    expect(main.getByRole('link', { name: 'Escribinos por WhatsApp' })).toHaveAttribute(
      'href',
      'https://wa.me/5493515721881?text=Hola%2C%20quiero%20hacer%20una%20consulta%20sobre%20Grupo%20Agro%20Polo',
    )
    expect(main.getByRole('link', { name: '@grupoagropolo' })).toHaveAttribute('href', 'https://www.instagram.com/grupoagropolo/')
    expect(main.getByRole('link', { name: /@agropolotour/i })).toHaveAttribute('href', 'https://www.instagram.com/agropolotour/')
    expect(main.getByRole('link', { name: '+54 9 351 572-1881' })).toHaveAttribute('href', 'tel:+5493515721881')
    expect(main.getByRole('link', { name: 'info@grupoagropolo.com' })).toHaveAttribute('href', 'mailto:info@grupoagropolo.com')
    expect(main.queryByText(/en construcción/i)).not.toBeInTheDocument()
    expect(main.queryByText(/pablo|sole/i)).not.toBeInTheDocument()
    expect(main.queryByText(/sección preparada/i)).not.toBeInTheDocument()
  })

  it('marca los campos que faltan junto a cada uno', () => {
    const { container } = renderContact()
    const page = within(container)
    fireEvent.click(page.getByRole('button', { name: /enviar consulta/i }))
    expect(page.getByLabelText(/nombre/i)).toHaveAccessibleDescription('Escribí tu nombre.')
    expect(page.getByLabelText(/teléfono/i)).toHaveAccessibleDescription('Escribí un teléfono para contactarte.')
    expect(page.getByLabelText(/sobre qué querés consultar/i)).toHaveAccessibleDescription('Elegí sobre qué querés consultar.')
    expect(page.getByLabelText(/mensaje/i)).toHaveAccessibleDescription('Contanos brevemente qué necesitás.')
    expect(page.getByLabelText(/nombre/i)).toHaveFocus()
  })

  it('abre WhatsApp con la consulta armada y confirma el envío', () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    try {
      const { container } = renderContact()
      const page = within(container)
      fireEvent.change(page.getByLabelText(/nombre/i), { target: { value: 'Juan Pérez' } })
      fireEvent.change(page.getByLabelText(/teléfono/i), { target: { value: '351 555-1234' } })
      fireEvent.change(page.getByLabelText(/sobre qué querés consultar/i), { target: { value: '+PROTECT' } })
      fireEvent.change(page.getByLabelText(/mensaje/i), { target: { value: 'Quiero asegurar una sembradora.' } })
      fireEvent.click(page.getByRole('button', { name: /enviar consulta/i }))

      const text = [
        'Hola, les escribo desde la web de Grupo Agro Polo.',
        'Nombre: Juan Pérez',
        'Teléfono: 351 555-1234',
        'Consulta sobre: +PROTECT',
        'Quiero asegurar una sembradora.',
      ].join('\n')
      const href = `https://wa.me/5493515721881?text=${encodeURIComponent(text)}`
      expect(open).toHaveBeenCalledWith(href, '_blank', 'noopener')
      expect(page.getByRole('status')).toHaveTextContent(/te abrimos whatsapp con tu consulta/i)
      expect(page.getByRole('link', { name: /abrir whatsapp/i })).toHaveAttribute('href', href)
    } finally {
      open.mockRestore()
    }
  })
})

describe('catálogos de las unidades', () => {
  it.each([
    ['/protect', '/catalogos/agro-polo-protect.pdf'],
    ['/labs', '/catalogos/agro-polo-labs.pdf'],
  ])('%s ofrece descargar su catálogo', (path, file) => {
    cleanup()
    render(
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /descargar el catálogo/i })).toHaveAttribute('href', file)
  })
})
