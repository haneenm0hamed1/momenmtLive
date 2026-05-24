// بنستورد الدالة اللي بتعمل الاتصال بـ Supabase
import { createClient } from '@supabase/supabase-js'

// الـ URL بتاع مشروعك على Supabase
const supabaseUrl = 'https://znlnjstjjcfhvvgnqflw.supabase.co'

// المفتاح العام - مش سر، تقدر تحطه في الكود
const supabaseKey = 'sb_publishable_hoszeP8U5zurYOgY6SMKRQ_0AwoGoWl'

// بنعمل اتصال وبنصدّره عشان أي ملف تاني يستخدمه
export const supabase = createClient(supabaseUrl, supabaseKey)