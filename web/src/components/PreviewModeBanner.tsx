import { useRouter } from 'next/router'

export function PreviewModeBanner() {
  const { isPreview, push } = useRouter()

  return (
    <div
      style={{
        padding: 20,
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#000',
        color: '#fff',
        display: isPreview ? 'block' : 'none'
      }}
    >
      Preview mode
      <button
        onClick={() => push('/api/destroy-preview-mode')}
        style={{
          all: 'unset',
          background: 'transparent',
          border: '1px solid #fff',
          borderRadius: '5px',
          color: '#fff',
          cursor: 'pointer',
          padding: '5px 10px',
          marginLeft: '10px'
        }}
      >
        Exit preview
      </button>
    </div>
  )
}
