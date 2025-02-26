import React, { useState, useEffect } from 'react';
import { X, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '../lib/supabase';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonColor?: string;
}

// Esquema de validación con Zod
const quoteSchema = z.object({
  fullName: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder los 100 caracteres'),
  email: z.string()
    .email('Por favor, ingrese un email válido'),
  phone: z.string()
    .regex(/^\d{9}$/, 'Por favor, ingrese un número de teléfono válido de 9 dígitos'),
  location: z.string()
    .max(200, 'La ubicación no puede exceder los 200 caracteres')
    .optional(),
  projectDescription: z.string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(1000, 'La descripción no puede exceder los 1000 caracteres'),
  additionalComments: z.string()
    .max(500, 'Los comentarios no pueden exceder los 500 caracteres')
    .optional()
});

type QuoteFormData = z.infer<typeof quoteSchema>;

type FieldErrors = {
  [K in keyof QuoteFormData]?: string;
};

function QuoteModal({ isOpen, onClose, buttonColor = 'bg-green-600 hover:bg-green-700' }: QuoteModalProps) {
  const initialFormData = {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    projectDescription: '',
    additionalComments: ''
  };

  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      resetForm();
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitError(null);
    setSubmitSuccess(false);
    setTouched({});
    setIsSubmitting(false);
  };

  const validateField = (name: keyof QuoteFormData, value: string) => {
    try {
      const fieldSchema = quoteSchema.shape[name];
      fieldSchema.parse(value);
      setErrors(prev => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Para el campo de teléfono, solo permitir números
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 9);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      if (touched[name]) {
        validateField(name as keyof QuoteFormData, numericValue);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (touched[name]) {
        validateField(name as keyof QuoteFormData, value);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name as keyof QuoteFormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    const allTouched = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);

    try {
      // Validar todo el formulario
      const validatedData = quoteSchema.parse(formData);
      setIsSubmitting(true);
      setSubmitError(null);

      // Insertar en Supabase
      const { error } = await supabase
        .from('quotes')
        .insert([
          {
            full_name: validatedData.fullName,
            email: validatedData.email,
            phone: validatedData.phone,
            location: validatedData.location || null,
            project_description: validatedData.projectDescription,
            additional_comments: validatedData.additionalComments || null
          }
        ]);

      if (error) {
        throw new Error('Error al guardar la cotización');
      }

      setSubmitSuccess(true);
      
      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FieldErrors = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof QuoteFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        setSubmitError('Por favor, corrija los errores en el formulario.');
      } else {
        console.error('Error al procesar el formulario:', error);
        setSubmitError('Error al procesar la cotización. Por favor, inténtelo de nuevo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputClasses = `w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500`;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Cotizar Proyecto</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <p className="text-gray-600 text-sm italic bg-gray-50 p-4 rounded-lg">
                Comparta una breve descripción de su proyecto y nuestro equipo se comunicará con usted pronto.
              </p>

              {submitError && (
                <div className="flex items-center gap-2 bg-red-50 text-red-700 p-4 rounded-lg text-sm">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p>{submitError}</p>
                </div>
              )}

              {submitSuccess && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 p-4 rounded-lg text-sm">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  <p>¡Cotización enviada con éxito! Nos pondremos en contacto pronto.</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${inputClasses} ${
                      errors.fullName && touched.fullName ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.fullName && touched.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${inputClasses} ${
                      errors.email && touched.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && touched.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono * (9 dígitos)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="123456789"
                    className={`${inputClasses} ${
                      errors.phone && touched.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && touched.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Ubicación (Opcional)
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${inputClasses} ${
                      errors.location && touched.location ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.location && touched.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción del proyecto *
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    required
                    value={formData.projectDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    className={`${inputClasses} ${
                      errors.projectDescription && touched.projectDescription ? 'border-red-300' : 'border-gray-300'
                    }`}
                  ></textarea>
                  {errors.projectDescription && touched.projectDescription && (
                    <p className="mt-1 text-sm text-red-600">{errors.projectDescription}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="additionalComments" className="block text-sm font-medium text-gray-700 mb-1">
                    Comentarios adicionales (Opcional)
                  </label>
                  <textarea
                    id="additionalComments"
                    name="additionalComments"
                    value={formData.additionalComments}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={3}
                    className={`${inputClasses} ${
                      errors.additionalComments && touched.additionalComments ? 'border-red-300' : 'border-gray-300'
                    }`}
                  ></textarea>
                  {errors.additionalComments && touched.additionalComments && (
                    <p className="mt-1 text-sm text-red-600">{errors.additionalComments}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className={`px-6 py-2 rounded-md text-white transition-all duration-300 flex items-center ${buttonColor} ${
                    (isSubmitting || submitSuccess) ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Enviando...
                    </>
                  ) : submitSuccess ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      ¡Enviado!
                    </>
                  ) : (
                    'Enviar Cotización'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteModal;